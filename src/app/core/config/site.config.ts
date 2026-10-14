import { RedeSocial } from '../models/rede-social';

export const SITE = {
  nome: 'Complexo Escolar Privado Sassapa',
  nomeLinhas: ['Complexo Escolar', 'Privado Sassapa'],
  descricao: 'Educar com excelência, formar com valores.',
  anoFundacao: 2011,
} as const;

export const NAV_ITEMS = [
  { label: 'Início', rota: '/' },
  { label: 'Sobre', rota: '/sobre' },
  { label: 'Educação', rota: '/educacao' },
  { label: 'Galeria', rota: '/galeria' },
  { label: 'Notícias', rota: '/noticias' },
  { label: 'Contactos', rota: '/contactos' },
] as const;

// TODO(colégio): confirmar contactos oficiais antes de publicar.
export const CONTACTOS = {
  telefone: '+244 900 000 000',
  telefoneLabel: '+244 900 000 000',
  email: 'geral@complexosassapa.ao',
  morada: 'Luanda, Angola',
  horario: 'Segunda a sexta, das 7h30 às 17h30',
} as const;

// TODO(colégio): substituir pelas coordenadas reais do colégio.
export const SCHOOL_COORDS = { lat: -8.8368, lng: 13.2034 } as const;

// TODO(colégio): substituir pelos URLs oficiais das redes sociais.
export const REDES_SOCIAIS: readonly RedeSocial[] = [
  { id: 'facebook', label: 'Facebook', sigla: "Fb'", url: 'TODO' },
  { id: 'instagram', label: 'Instagram', sigla: "Ig'", url: 'TODO' },
  { id: 'whatsapp', label: 'WhatsApp', sigla: "Wa'", url: 'TODO' },
  { id: 'youtube', label: 'YouTube', sigla: "Yt'", url: 'TODO' },
  { id: 'tiktok', label: 'TikTok', sigla: "Tk'", url: 'TODO' },
];

// TODO(colégio): substituir pelo ID do vídeo de apresentação oficial.
export const VIDEO_APRESENTACAO = { youtubeId: 'TODO', duracao: '2 min' } as const;
