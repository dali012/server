export type Client = {
  id_client?: string;
  code_client: number;
  created_at?: Date;
  updated_at?: Date;
  fiche_technique: Fiche_Technique[];
};

export type Presentation = {
  id_presentation?: string;
  nom_article?: string;
  papier_grammage?: string;
  couleur?: string;
  format_fini?: string;
  nbr_exemplaire?: number;
};

export type PAO = {
  id_pao?: string;
  film?: string;
  plaque?: string;
  archived?: boolean;
  created_at?: Date;
  updated_at?: Date;
  remarque?: string;
};

export type Administratif = {
  id_administratif?: string;
  devis?: string;
  n_bon_commande?: number;
  date?: string;
  n_commande?: number;
  quantite?: number;
  remarque?: string;
};

export type Production = {
  id_production?: string;
  conducteur?: string;
  nbr_tirage?: number;
  numerotaion?: number;
  format_impression?: string;
  nbr_poses?: number;
  nbr_plaques?: number;
};

export type Finition = {
  id_finition?: string;
  format_papier?: string;
  qte_papier_couleur?: number;
  type_finition?: string;
};

export type Fiche_Technique = {
  id_fiche_technique?: string;
  code_client: number;
  presentation: Presentation;
  pao: PAO;
  administratif: Administratif;
  production: Production;
  finition: Finition;
};
