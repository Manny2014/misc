import React from 'react';
import { Table, TableColumn, Progress, ResponseErrorPanel } from '@backstage/core-components';
import { Entity } from '@backstage/catalog-model';
import { useAsync } from 'react-use';
import { useApi } from '@backstage/core-plugin-api';
import { argoWorkflowsApiRef } from '../../api';
import {
  Typography,
  Box,
} from '@material-ui/core';

type Workflow = {
  name: string,
  status: string
}

type DenseTableProps= {
  workflows: Workflow[];
  isLoading: boolean,
};

export const DenseTable = ({ workflows }: DenseTableProps) => {

  const columns: TableColumn[] = [
    { title: 'Name', field: 'name' },
    { title: 'Status', field: 'status', highlight: true},
  ];

  const data = workflows.map(w => {
    return {
      name: w.name,
      status: w.status
    };
  });

  return (
    <>
    <Table
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
      totalCount={data.length}
      style={{ width: '100%'}}
      title={
        <Box display="flex" alignItems="center">
          <Box mr={1} />
          <Typography variant="h6">Argo Workflow Runs</Typography>
        </Box>
      }
    />
    </>
  );
};

export const WorkflowBuildsTable = () => {
  
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

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  if(value) {
    return (
      <div>
        <DenseTable isLoading={loading} workflows={value || []} />
      </div>
    );
  }

  return <h1>Not Found</h1>
}

export default WorkflowBuildsTable;