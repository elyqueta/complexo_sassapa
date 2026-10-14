import { Album } from '../models/album';

// TODO(colégio): álbuns de exemplo — substituir pelas colecções reais da escola.
export const ALBUNS_MOCK: readonly Album[] = [
  {
    id: 'vida-escolar',
    titulo: 'Vida escolar',
    capa:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Angola_colegio_psv.JPG/1280px-Angola_colegio_psv.JPG',
    capaAlt: 'Alunos angolanos no átrio da escola',
    itens: 48,
    subAlbuns: [
      {
        id: 'salas-de-aula',
        titulo: 'Salas de aula',
        capa: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Kuito_class.jpg',
        capaAlt: 'Sala de aula no Kuito, Bié, Angola',
        itens: 24,
      },
      {
        id: 'biblioteca',
        titulo: 'Biblioteca',
        capa:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Adult_literacy_students_%285687218318%29.jpg/1280px-Adult_literacy_students_%285687218318%29.jpg',
        capaAlt: 'Programa de literacia em Luanda, Angola',
        itens: 16,
      },
    ],
  },
  {
    id: 'desporto',
    titulo: 'Desporto',
    capa:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Escola_Eiffel_%28Angola-Bengo%29_P1049_05-07-12.jpg/1280px-Escola_Eiffel_%28Angola-Bengo%29_P1049_05-07-12.jpg',
    capaAlt: 'Actividade desportiva numa escola angolana',
    itens: 36,
  },
  {
    id: 'cultura',
    titulo: 'Cultura e artes',
    capa:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Escola_Eiffel_%28Angola-Bengo%29_P1055_27-07-12.jpg/960px-Escola_Eiffel_%28Angola-Bengo%29_P1055_27-07-12.jpg',
    capaAlt: 'Actividade cultural numa escola angolana',
    itens: 30,
  },
  {
    id: 'instalacoes',
    titulo: 'Instalações',
    capa:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/IAA_campus_view.jpg/1280px-IAA_campus_view.jpg',
    capaAlt: 'Vista de um campus educativo em Angola',
    itens: 22,
  },
];
