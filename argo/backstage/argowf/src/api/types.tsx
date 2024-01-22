
/** @public */
export interface RouterProps {
    view?: 'cards' | 'table';
  }

export type ListWorkflowOptions = {
  namespace: string,
  labelSelector?: string[],
  fields?: string[]
}