import { ArgoWorkflowsApi } from "./ArgoWorkflowsApi";
import { ConfigApi, DiscoveryApi } from '@backstage/core-plugin-api';
import { ListWorkflowOptions } from "./types";
import { Configuration, WorkflowServiceApi} from "./sdk";

export class ArgoWorkflowsClient implements ArgoWorkflowsApi {
    private readonly configApi: ConfigApi;
    private readonly discoveryApi: DiscoveryApi;

    constructor(options: { configApi: ConfigApi,  discoveryApi: DiscoveryApi}) {
        this.configApi = options.configApi;
        this.discoveryApi = options.discoveryApi;
    }

    async listWorkflows(options: ListWorkflowOptions) {
        const token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Il9NMFI2eE0yTzdMNWpUY0FsV2FjTjNqM1V2ZF9ueHhPU3RQTk1QQXh1eHcifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiXSwiZXhwIjoxNzA1Mjk4NDY1LCJpYXQiOjE3MDUyODc2NjUsImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJhcmdvIiwic2VydmljZWFjY291bnQiOnsibmFtZSI6ImFyZ28iLCJ1aWQiOiIyZjI4NWIyNy04Mjc3LTQ3YjQtYWZmOC1jNmJjMTYzMzg2YzAifX0sIm5iZiI6MTcwNTI4NzY2NSwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmFyZ286YXJnbyJ9.ncu1RJdvQ-rqDhvDywpqRjOrKPYHfhQ3mww1xZsVJs1VGZBNuzHb1R9iUZ6gG50MyD-8fnxFdv6B4G5ITcBs9Mxwpf3pVr9nLuG4s0Sl7st5oR9S8GRXJNR39Tsdl5sp3Toh9M0xeiUK7nmb5TotT9j7Xx93ObWpLgQdHZrQonevwjClTdpFo_6LZPk6SLtldSQTWVH0mxfb-jqWOrK_Y2sQHZ6sD8MnrgRW-8ekz3eY6m4QIpqW06I-yJmhRZDE_2d5mR03u0ZIyosYUOlXNyRYODDVmvc4g4ERCUKR38ZcehOu-71yk9HzgRqMHpnqKbo78Cskh5lCMmSI4HIaQA';
        const argoUrl = `${await this.discoveryApi.getBaseUrl('proxy')}/argowf-proxy`;

        const config = new Configuration({
          basePath: argoUrl,
          apiKey: token
        })

        const svc = new WorkflowServiceApi(config);
        return svc.workflowServiceListWorkflows(options.namespace, "backstage=true");
    }

    async getEndpoint() {
        const argoUrl = `${await this.discoveryApi.getBaseUrl('proxy')}/argowf-proxy`;
        return argoUrl;
    }
    
    async getLogsEndpoint(workflowName: string) {
        const baseUrl = await this.getEndpoint();

        return baseUrl.concat("/", "argo", workflowName, "log");
    }

}