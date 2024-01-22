import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { ArgoWorkflowServiceClient } from 'argowf-js-client';
export const createArgoSubmitWftAction = (config) => {
    return createTemplateAction({
        id: 'argo:wft:submit',
        schema: {
            input: {
                required: [
                    'workflowTemplateName',
                    'namespace'
                ],
                type: 'object',
                properties: {
                    workflowTemplateName: {
                        type: 'string',
                        title: 'Workflow template name',
                        description: 'Argo workflow template name'
                    },
                    namespace: {
                        type: 'string',
                        title: 'Namespace where to submit workflow',
                        description: 'Kubernetes namespace where the workflow should be submitted'
                    },
                    workflowInputs: {
                        title: 'Workflow inputs',
                        type: 'string',
                        description: "Comma separated list of argo wf inputs"
                    }
                }
            }
        },
        async handler(ctx) {
            // Pull inputs
            const inputs = ctx.input.workflowInputs?.toString().split(",");
            const tplName = ctx.input.workflowTemplateName?.toString();
            const ns = ctx.input.namespace?.toString();
            ctx.logger.info(`Config: ${config.get('argoWorkflows.server')}`);
            // Create client
            let client = new ArgoWorkflowServiceClient(config.get('argoWorkflows.server'), ns, ctx.logger);
            ctx.logger.info(`Running argo:wft:submit action template ${tplName} on namespace ${ns} with inputs ${inputs}`);
            try {
                const d = await client.submitWftAndWait(tplName, inputs);
                ctx.logger.info("outputting returned data...");
                ctx.logger.info(JSON.stringify(d));
            }
            catch (e) {
                throw e;
            }
        },
    });
};
