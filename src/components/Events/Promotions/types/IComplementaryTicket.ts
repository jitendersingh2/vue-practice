export default interface IComplementaryTicket {
  id: number;
  fName: string;
  lName: string;
  type: string;
  email: string;
  quantity: string | number;
  [key: string]: string | number;
}
