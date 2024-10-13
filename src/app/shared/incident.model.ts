export interface NewIncident {
  title: string;
  datetime: string;
  location: string;
  region: string;
  category: string;
  statement: string;
  items: Array<{}>;
}
