export interface Promotion {
  id: number;
  dateDebut: string;
  dateFin: string;
  pourcentage: number;
  hotel_id: number | null;
}
