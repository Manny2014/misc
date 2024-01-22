import { createApiRef } from '@backstage/core-plugin-api';
import {IoArgoprojWorkflowV1alpha1WorkflowList} from './sdk';
import { ListWorkflowOptions } from "./types";

/** @public */
export const argoWorkflowsApiRef = createApiRef<ArgoWorkflowsApi>({
    id: 'plugin.argoworkflows.service',
});

export type ArgoWorkflowsApi = {
    listWorkflows: (options: ListWorkflowOptions) => Promise<IoArgoprojWorkflowV1alpha1WorkflowList>;
    getEndpoint: () => Promise<string>;
    getLogsEndpoint: (workflowName: string) => Promise<string>;
}