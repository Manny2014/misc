import React from 'react';
import { Entity } from '@backstage/catalog-model';
import { RouterProps } from '../api/types';
import { Routes, Route, createBrowserRouter } from 'react-router-dom';
import {
    useEntity,
    MissingAnnotationEmptyState,
  } from '@backstage/plugin-catalog-react'
import {WorkflowRunDetails} from './WorkflowRunDetails';
import {WorkflowRunsCard} from './WorkflowRunsCard';
import { buildRouteRef } from '../routes';
import { WorkflowBuildsTable } from './WorkflowBuildsTable';

/** @public */
export const ARGO_WF_ANNOTATION = 'argo-wf/component_id';

/** @public */
export const isArgoWfAvailable = (entity: Entity) => Boolean(entity.metadata.annotations?.[ARGO_WF_ANNOTATION]);


/** @public */
export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<WorkflowBuildsTable />} />
    </Routes>
  )
}

export const EmbeddedRouter = (props: RouterProps) => {
    const { view = 'table' } = props;
    const { entity } = useEntity();

    if (!isArgoWfAvailable(entity)) {
        return (
          <MissingAnnotationEmptyState annotation={ARGO_WF_ANNOTATION} />
        );    }

    const workflowRunsComponent =
      view === 'cards' ? (
        <WorkflowRunsCard/>
      ) : (
        <WorkflowBuildsTable/>
      );

        
    return (
        <Routes>
          <Route path="/" element={workflowRunsComponent} />
          <Route
            path={`${buildRouteRef.path}`}
            element={<WorkflowRunsCard entity={entity} />}
          />
        </Routes>
      );
}