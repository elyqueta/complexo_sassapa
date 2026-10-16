export type HeroVariant = 'home' | 'noticias';

export interface ListaModal {
  rotulo: string;
  itens: string[];
}

export interface ModalFaixa {
  descricao: string;
  listas: ListaModal[];
}

export interface ItemFaixa {
  id: string;
  /** Só usado na variante "noticias" (marcador estilo "Ped'"). */
  etiqueta?: string;
  titulo: string;
  detalhe: string;
  rodape: string;
  rota: string;
  /** Se existir, o item abre um modal em vez de navegar. */
  modal?: ModalFaixa;
}

/** Ciclos mostrados na faixa da Home (o 2.º Ciclo já inclui o Ensino Médio). */
export const ORDEM_CICLOS = [
  'iniciacao',
  'ensino-primario',
  'primeiro-ciclo',
  'segundo-ciclo',
] as const;

export const TITULOS_CICLO: Record<string, string> = {
  'segundo-ciclo': '2.º Ciclo (Ensino Médio)',
};

// TODO(colégio): textos de exemplo — substituir pelas descrições oficiais.
export const DESCRICAO_FORMACOES =
  'Cursos e workshops de curta e média duração para alunos, encarregados de educação e comunidade, com foco em competências práticas e preparação para o mercado de trabalho.';

export const DESCRICAO_FERIAS =
  'Durante as férias escolares, o colégio mantém actividades de reforço, lazer e preparação para exames, adaptadas a cada ciclo de ensino.';