
import {WorkflowServiceApi, Configuration, IoArgoprojWorkflowV1alpha1WorkflowList} from '../api/sdk';

function useWorkflowBuildsList() {
    const api = useApi(argoWorkflowsApiRef);

    const { value, error, loading } = useAsync(async (): Promise<Workflow[]> => {
    
      // const data = (await getWorkflows());
      const data = await api.listWorkflows({namespace: "argo"});
  
      const curatedWfs = data.items.map((wf) => {
        return {name: wf.metadata.name!, status: wf.status!.phase!};
      });
  
      // return curatedWfs;
      return curatedWfs;
    }, [api]);
}