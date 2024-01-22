'use strict';

import * as client from "../dist/index.js"
import 'isomorphic-fetch';

const config = new client.Configuration({
    apiKey: `Bearer ${process.env.ARGOWF_TOKEN}`,
    basePath: "http://localhost:9090"
})

// let templateSvc = new client.WorkflowTemplateServiceApi(config)

// await templateSvc.workflowTemplateServiceListWorkflowTemplates("argo")
//     .then((l)=> {
//         l.items.forEach((i) => {console.log(i)})
//     })
//     .catch((e) => console.log(e))

let wfSvc = new client.WorkflowServiceApi(config)

const body = {
    resourceKind: "WorkflowTemplate",
    namespace: "argo",
    resourceName: "workflow-template-submittable",
    dryRun: false,
    submitOptions: {
        parameters: [
            "message=hello swagger"
        ]
    }
};

wfSvc.workflowServiceSubmitWorkflow(body, "argo")
    .then((l)=> {
        console.log("getting log for " + l.metadata.name)
        let run = true;
        const max = 20;
        let c=1;

        while(run) {
            c++;

            if (c <= max) {
                wfSvc.workflowServiceGetWorkflow(l.metadata.namespace, l.metadata.name).then((s) => {
                    console.log("wf status: " + s.status.phase)
                    if (s.status.phase in ['Failed', 'Succeeded'] ){
                        console.log("getting logs..")
                        wfSvc.workflowServiceWorkflowLogs(s.metadata.namespace, s.metadata.name,logOptionsContainer="main")
                            .then((d)=> console.log(d))
                            .catch((e) => console.log(e))
                    }else{
                    }
                })
                .catch((e) => console.log(e))

            }else{
                run = false
            }
        }
        
    })
    .catch((e) => console.log(e))




