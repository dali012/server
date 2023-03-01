export type Client = {
  id_client?: string;
  code_client: number;
  detail: Detail[];
};
export type Detail = {
  n_bon_commande: number;
  Date: string;
  n_commande: number;
  qte: number;
  machine: string;
  nbr_tirage_tour: number;
  numerotation: number;
  format_impression: string;
  nbr_plaque: number;
  nbr_poses: number;
  format_papier: string;
  qte_papier_par_couleur: number;
  type_finition: string;
};
