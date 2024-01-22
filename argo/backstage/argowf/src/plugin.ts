import { 
  createPlugin, 
  createRoutableExtension, 
  createComponentExtension, 
  createApiFactory, 
  configApiRef, 
  discoveryApiRef } from '@backstage/core-plugin-api';
import { rootRouteRef } from './routes';
import {  argoWorkflowsApiRef,ArgoWorkflowsClient } from './api';

export const argowfPlugin = createPlugin({
  id: 'argowf',
  apis: [
    createApiFactory({
      api: argoWorkflowsApiRef,
      deps: { 
        configApi: configApiRef, 
        discoveryApi: discoveryApiRef
      },
      factory: ({ configApi, discoveryApi }) => new ArgoWorkflowsClient({configApi, discoveryApi}),
    })
  ],
  routes: {
    root: rootRouteRef,
  }
});

export const ArgowfPage = argowfPlugin.provide(
  createRoutableExtension({
    name: 'ArgowfPage',
    component: () =>
      import('./components/Router').then(m => m.Router),
    mountPoint: rootRouteRef,
  }),
);

// Component/Entity Overview Card
export const EntityRecentArgowfRunCard = argowfPlugin.provide(
  createComponentExtension({
    name: 'EntityRecentArgowfRunCard',
    component: {
      lazy: () => import('./components/WorkflowRunsCard').then(m => m.WorkflowRunsCard)
    }
  })
)