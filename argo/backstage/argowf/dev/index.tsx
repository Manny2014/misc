import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { argowfPlugin, ArgowfPage } from '../src/plugin';

createDevApp()
  .registerPlugin(argowfPlugin)
  .addPage({
    element: <ArgowfPage />,
    title: 'Root Page',
    path: '/argowf'
  })
  .render();
