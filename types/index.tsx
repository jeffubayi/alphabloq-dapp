export type JokesState = {
  id: number;
  Title: string;
  Author: string;
  Body: string;
  Views: number;
  CreatedAt: Date | number;
};

export type JokesValues = {
  id?: number | string | undefined;
  Title: string | string[] | undefined;
  Author: string | string[] | undefined;
  Body?: string | string[] | undefined;
  Views: string | string[] | undefined;
  CreatedAt?: Date | string | string[];
};

export type Item = {
  id?: string;
  Price: number;
  Collection: string;
  Item: string;
  Picture: string;
  Description?: string;
};

export type Client = {
  id?: string;
  Phone: number;
  Contact?: string;
  Company?: string;
  Title?:string;
};

export type Customers = {
  customer:Client;
};

export type Order = {
  id: string;
  TrackingCode?: string;
  Category?: string;
  CreatedAt?: Date;
 Status?:string;
};

export type Orders = {
  order:Order;
};

export type Inventory = {
  product: Item;
};
