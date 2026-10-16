export type HeroVariant = 'home' | 'noticias';

export interface ItemFaixa {
  id: string;
  etiqueta: string;
  titulo: string;
  detalhe: string;
  rodape: string;
  rota: string;
}

/** Marcador curto (estilo "Sch'") de cada ciclo na faixa inferior. */
export const ETIQUETAS_CICLO: Record<string, string> = {
  iniciacao: 'Ini',
  'ensino-primario': 'Pri',
  'primeiro-ciclo': '1.º',
  'segundo-ciclo': '2.º',
  'ensino-medio': 'Med',
};