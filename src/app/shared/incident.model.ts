export interface Incident {
  title: string;
  datetime: string;
  location: string;
  region: string;
  category: string;
  statement: string;
  items: Array<{}>;
  createdAt?: string;
  updatedAt?: string;
}
