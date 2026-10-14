export interface Album {
  id: string;
  titulo: string;
  capa: string;
  capaAlt: string;
  itens: number;
  subAlbuns?: Album[];
}
