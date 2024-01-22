import { createRouteRef,createSubRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'argowf',
});


export const buildRouteRef = createSubRouteRef({
  id: 'argowf/build',
  path: '/:id',
  parent: rootRouteRef,
});