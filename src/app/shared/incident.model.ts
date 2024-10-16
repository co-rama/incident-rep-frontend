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
  userEmail?: string;
}
export interface IncidentsCount {
  allTime: number;
  thisMonth: number;
  thisWeek: number;
  today: number;
  message?: string;
}
export interface Filters {
  title?: string;
  category?: string;
  region?: string;
  from?: string;
  to?: string;
}
