export interface Evento {
  id: string;
  titulo: string;
  dataHora: string;
  local?: string;
  descricao?: string;
  imagem?: string;
  imagemAlt?: string;
}
