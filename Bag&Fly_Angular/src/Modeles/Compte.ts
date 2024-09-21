export interface Compte {
  id: number;
  Email: string;
  Password: string;
  administrator_id: number | null;
  client_id: number | null;
}
