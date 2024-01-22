import React, { useState } from 'react';
import { useEntity } from '@backstage/plugin-catalog-react';
import { useApi } from '@backstage/core-plugin-api';
import { Link } from 'react-router-dom';
import { IoArgoprojWorkflowV1alpha1Workflow, argoWorkflowsApiRef } from '../../api';
import {
    ErrorPanel,
    InfoCard,
    Progress, 
    ResponseErrorPanel,
    InfoCardVariants,
    Table,
  } from '@backstage/core-components';
import { Typography } from '@material-ui/core';
import { useAsync } from 'react-use';

export const WorkflowRunsCard = () => {
    const { entity } = useEntity();
    const [endpoint, setEndpoint] = useState("");

    const api = useApi(argoWorkflowsApiRef);

    const { value, error, loading } = useAsync(async (): Promise<IoArgoprojWorkflowV1alpha1Workflow[]> => {
      // const data = (await getWorkflows());
      setEndpoint(await api.getEndpoint());
      const data = await api.listWorkflows({namespace: "argo"});

      // return curatedWfs;
      return data.items || [];
    }, [api, endpoint]);
  
    if (loading) {
      return <Progress />;
    } else if (error) {
      return <ResponseErrorPanel error={error} />;
    }

    return (
        <InfoCard
            title="Recent Workflow Runs"
            subheader="All Branches"
            noPadding
            variant='flex'
        >
            {!value?.length ? (
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="body1">
                        This component has GitHub Actions enabled, but no workflows were
                        found.
                    </Typography>
                </div>
            ) : (
                <Table<IoArgoprojWorkflowV1alpha1Workflow> 
                    options={{ search: false, paging: false }}
                    isLoading={loading}
                    data={value}
                    columns={[
                        { title: 'Name', field: 'metadata.name' },
                        { title: 'Status', field: 'status.phase', render: wf => (
                            <Link to={endpoint.concat("/argo/", wf.metadata.name!, "/log")}>
                                {wf.status?.phase!}
                            </Link>
                        )},
                    ]}
                />
            )}

        </InfoCard>
    )
}

export default WorkflowRunsCard;