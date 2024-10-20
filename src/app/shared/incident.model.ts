export interface Incident {
  title: string;
  datetime: string;
  location: string;
  region: string;
  category: string;
  statement: string;
  items: Array<{
    title: string; // Ensure title exists here if you're accessing it
    quantity: number;
    cost: number;
    specification: string;
  }>;
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
  categories?: string[];
  regions?: string[];
  from?: Date | undefined;
  to?: Date | undefined;
}
