export interface MidiaItem {
  id: string;
  tipo: 'imagem' | 'video';
  url: string;
  titulo?: string;
  ordem: number;
}
