export interface PromptTemplate<T> {
  version: string;
  template: string;
  render: (params: T) => string;
}
