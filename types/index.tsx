
//type definitions
export type Chat = {
  id?: string;
  Phone: number;
  Contact?: string;
  Company?: string;
  Title?: string;
};

export type Sellers = {
  chat: Chat;
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


export type Transaction = {
  id: string;
  TrackingCode?: string;
  Category?: string;
  CreatedAt?: Date;
  Status?: string;
};

export type Wallet = {
  wallet: Transaction;
};


export interface Listing  {
  id: number,
  image: string,
  title: string,
  location: string,
  price: string | number,
  rating: number,
  favourite: boolean,
  details: string,
  about: string,
  bath: number,
  bed: number,
  sqft: number,
  shareUrl: string,
  floor: number,
  dsq: number,
  roof: number,
  villa: number,
}

export type Property = {
  property: Listing,
}
