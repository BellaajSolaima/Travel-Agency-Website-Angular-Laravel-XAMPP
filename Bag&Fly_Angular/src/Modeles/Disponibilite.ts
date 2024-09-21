export interface Disponibilite {
  id: number;
  dateDebut: string;
  dateFin: string;
  nbChambre2: number;
  nbChambreRestantes2: number;
  prixChambre2: number;
  nbChambre3: number;
  nbChambreRestantes3: number;
  prixChambre3: number;
  nbChambre4: number;
  nbChambreRestantes4: number;
  prixChambre4: number;
  hotel_id: number | null;
}
