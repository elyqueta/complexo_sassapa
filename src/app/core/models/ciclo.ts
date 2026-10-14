export interface Responsavel {
  nome: string;
  cargo: string;
  foto?: string;
}

export interface Ciclo {
  slug: string;
  nome: string;
  resumo: string;
  imagem: string;
  imagemAlt: string;
  responsavel?: Responsavel;
  classes: string[];
  cursos: string[];
  planoFerias?: string;
  extracurriculares: string[];
  formacoes: string[];
  stats?: { label: string; valor: number }[];
}
