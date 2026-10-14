import { Evento } from '../models/evento';

// TODO(colégio): conteúdo de exemplo — substituir pela agenda real.
export const EVENTOS_MOCK: readonly Evento[] = [
  {
    id: 'reuniao-pais',
    titulo: 'Reunião de pais e encarregados de educação',
    dataHora: '24 Out 2026, 15h00',
    local: 'Auditório principal',
    descricao:
      'Balanço do primeiro trimestre, entrega de avaliações e apresentação do plano de actividades para o segundo trimestre.',
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/IAA_campus_view.jpg/1280px-IAA_campus_view.jpg',
    imagemAlt: 'Vista de um campus educativo em Angola',
  },
  {
    id: 'festival-talentos',
    titulo: 'Festival de talentos Sassapa',
    dataHora: '07 Nov 2026, 09h00',
    local: 'Pavilhão desportivo',
    descricao:
      'Um dia de música, dança, poesia e teatro com a participação de alunos de todos os ciclos de ensino.',
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Escola_Eiffel_%28Angola-Bengo%29_P1055_27-07-12.jpg/960px-Escola_Eiffel_%28Angola-Bengo%29_P1055_27-07-12.jpg',
    imagemAlt: 'Alunos de uma escola em Bengo numa actividade cultural',
  },
  {
    id: 'aula-natacao',
    titulo: 'Abertura das aulas de natação',
    dataHora: '03 Nov 2026, 16h00',
    local: 'Piscina do colégio',
    descricao:
      'Início das aulas extracurriculares de natação para os alunos do Ensino Primário e do 1.º Ciclo.',
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Escola_Eiffel_%28Angola-Bengo%29_P1255_22-06-12.jpg/1280px-Escola_Eiffel_%28Angola-Bengo%29_P1255_22-06-12.jpg',
    imagemAlt: 'Alunos de uma escola angolana numa actividade em grupo',
  },
];
