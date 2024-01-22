import {
    ANNOTATION_LOCATION,
    ANNOTATION_SOURCE_LOCATION,
    Entity,
  } from '@backstage/catalog-model';

export const getHostnameFromEntity = (entity: Entity) => {
    const location =
        entity?.metadata.annotations?.[ANNOTATION_SOURCE_LOCATION] ??
        entity?.metadata.annotations?.[ANNOTATION_LOCATION];

    //gitUrlParse(location.slice(4)).resource
    return location?.startsWith('url:')
        ? "TBD"
        : undefined;
};