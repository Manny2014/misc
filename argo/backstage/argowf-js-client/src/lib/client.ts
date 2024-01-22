import fs, { read } from 'fs';
import { Logger,createLogger, transports, format  } from 'winston';
import { 
    Configuration, 
    WorkflowServiceApi,
    IoArgoprojWorkflowV1alpha1Workflow
} from '../client/index.js';

const K8S_SA_TOKEN_FILEPATH = '/var/run/secrets/kubernetes.io/serviceaccount/token';

type ArgoWorkflow = IoArgoprojWorkflowV1alpha1Workflow;

export class ArgoWorkflowServiceClient {
    private config: Configuration;
    private svc: WorkflowServiceApi;
    private logger: Logger = createLogger({
        transports: [new transports.Console()],
        format: format.combine(
          format.colorize(),
          format.timestamp(),
          format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
          })
        ),
      });


    constructor(
        private serverURL: string, 
        private namespace: string, 
        logger?: Logger,
        token?: string){

            if(logger) {
                this.logger = logger;
            }

            this.config = new Configuration({
                apiKey: token || ArgoWorkflowServiceClient.getBearerToken(),
                basePath: this.serverURL
            });

            this.svc = new WorkflowServiceApi(this.config);
        };

    private static getBearerToken() {
        let token = "";

        if(process.env.ARGOWF_TOKEN){
           token = process.env.ARGOWF_TOKEN || "NOT_SET";
        }else if(fs.existsSync(K8S_SA_TOKEN_FILEPATH)){
            token = fs.readFileSync(K8S_SA_TOKEN_FILEPATH, 'utf8');
        }else{
            token = "NOT_SET";
        }

        return "Bearer ".concat(token);
    }

    async listWorkflows() {
        const wfs = await this.svc.workflowServiceListWorkflows(this.namespace);
        return wfs.items || []
    }


    async submitWft(templateName: string, parameters: string[]): Promise<ArgoWorkflow> {

        const body = {
            resourceKind: "WorkflowTemplate",
            namespace: this.namespace,
            resourceName: templateName,
            dryRun: false,
            submitOptions: {
                parameters: parameters
            }
        };

        this.logger.info(`submitting workflow template ${templateName}`);
        return this.svc.workflowServiceSubmitWorkflow(body, this.namespace);
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private getWorkflowStatus(name: string): Promise<ArgoWorkflow>{
        return this.svc.workflowServiceGetWorkflow(this.namespace, name);
    }

    private getWorkflowExecutionLog(name: string, containerName = "main", since?: string){
        this.logger.debug("getting executing logs for workflow " + name);

        return this.svc.workflowServiceWorkflowLogs(this.namespace, name, undefined, containerName, false, false, undefined, since)
            .then((d) => {
                let strResult = "\n"
                let splitData = d.split("\n");

                splitData.forEach(line => {
                    // console.log("LINE ==> " + line);
                    if(line !== "") {
                        let result = JSON.parse(line);
                        strResult += result.result.content + "\n";
                    }
                })

                return strResult;
            });
    }

    async submitWftAndWait(templateName: string, parameters: string[], maxRetries: number = 60) {
        let run = true;
        const max = maxRetries;
        let c=0;
        let wfData: ArgoWorkflow;
        // let since = Math.floor((new Date()).getTime() / 1000);
        let since = this.getCurrentTimeUTC()

        this.logger.info("since ==> " + since.toString())

        // Submit wft
        try{
            wfData = await this.submitWft(templateName, parameters);
        }catch(e) {
            this.logger.error(e);
            const err = await (e as Response).json()
            this.logger.error(err);
            return;
        }
        
        
        if(!wfData.metadata.name){
            this.logger.error("issue executing workflow");
            return;
        }
        
        this.logger.info("waiting for wf completion...");

        while(run){
            c++;
            let status: ArgoWorkflow;

            try{
                status = await this.getWorkflowStatus(wfData.metadata.name);
            }catch(e) {
                const err = await (e as Response).json()
                this.logger.error(err);
                return;
            }

            switch(status.status?.phase) {
                case "Failed":
                    this.logger.error("workflow execution FAILED")
                    run = false;
                    let errLogs = await this.getWorkflowExecutionLog(wfData.metadata.name)
                    console.log(errLogs?.toString());
                    return status;
                case "Succeeded":
                    this.logger.info("workflow Succeeded")
                    run = false;
                    return status;
                default:
                    let logs = await this.getWorkflowExecutionLog(wfData.metadata.name, "main", since)
                    
                    if(logs.trim() !== ""){
                        this.logger.info(logs);
                    }

                    if(c >= max) {
                        this.logger.warn("workflow execution max wait time exceeded...")
                        run = false;
                    }
            }

            since = this.getCurrentTimeUTC();
            await this.delay(10000);
        }
    }

    getCurrentTimeUTC()
    {
        return Math.floor((new Date()).getTime() / 1000).toString();
    }
}