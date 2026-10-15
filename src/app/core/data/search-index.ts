export interface SearchIndexEntry {
  id: string;
  title: string;
  description: string;
  kind: string;
  href: string;
}

export const SEARCH_INDEX: readonly SearchIndexEntry[] = [
  {
    id: 'percurso',
    title: 'Ciclos de ensino',
    description: 'Conheça a Iniciação, o Ensino Primário e os ciclos seguintes.',
    kind: 'Página',
    href: '/educacao',
  },
  {
    id: 'inscricoes',
    title: 'Inscrições',
    description: 'Informações e formulário de inscrição no colégio.',
    kind: 'Página',
    href: '/inscricoes',
  },
  {
    id: 'ferias',
    title: 'Plano de férias',
    description: 'Actividades e reforço escolar durante as férias.',
    kind: 'Pergunta frequente',
    href: '/educacao',
  },
  {
    id: 'como-chegar',
    title: 'Como chegar',
    description: 'Morada e direcções para o Complexo Escolar Privado Sassapa.',
    kind: 'Pergunta frequente',
    href: '/contactos',
  },
  {
    id: 'actividades',
    title: 'Actividades extracurriculares',
    description: 'Desporto, clubes e actividades para os alunos.',
    kind: 'Pergunta frequente',
    href: '/educacao',
  },
];

export const SEARCH_SUGGESTIONS = [
  { label: 'Inscrições', href: '/inscricoes' },
  { label: 'Ensino Médio', href: '/educacao' },
  { label: 'Plano de férias', href: '/educacao' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Notícias', href: '/noticias' },
  { label: 'Contactos', href: '/contactos' },
  { label: 'Como chegar', href: '/contactos' },
  { label: 'Actividades extracurriculares', href: '/educacao' },
] as const;
