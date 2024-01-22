
# Scaffolder.ts
```js
  const actions = [...builtInActions, createArgoSubmitWftAction(env.config)];

  return await createRouter({
    actions,
    logger: env.logger,
    config: env.config,
    database: env.database,
    reader: env.reader,
    catalogClient,
    identity: env.identity,
    permissions: env.permissions,
  });
```