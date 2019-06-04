
export class User {
  id: string;
  username: string;
  lastname: string;
  email: string;
  phone: number;
  areacode: number;
  cartlist: string;
  birthmonth: number;
  region: string;
  level: string;
  orders: Array<any>;
  address: Array<any>;
  token?: string;
}
