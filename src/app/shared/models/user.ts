export class User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  region: string;
  areacode: number;
  phone: number;
  birthmonth: number;
  level: string;
  cartlist: string;
  orders: Array<any>;
  token?: string;
}
