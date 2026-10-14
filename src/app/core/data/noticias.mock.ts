import { Noticia } from '../models/noticia';

// TODO(colégio): conteúdo de exemplo — substituir por notícias reais.
export const NOTICIAS_MOCK: readonly Noticia[] = [
  {
    id: 'matriculas-2026',
    titulo: 'Matrículas abertas para o ano lectivo 2026',
    resumo:
      'As inscrições para a Iniciação, o Ensino Primário, o 1.º e 2.º Ciclos e o Ensino Médio já estão a decorrer. Vagas limitadas por turma.',
    data: '12 Set 2026',
    categoria: "Ped'",
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Angola_colegio_psv.JPG/1280px-Angola_colegio_psv.JPG',
    imagemAlt: 'Alunos angolanos no átrio da escola, mochilas às costas',
  },
  {
    id: 'torneio-futebol',
    titulo: 'Sassapa vence torneio inter-escolar de futebol',
    resumo:
      'A equipa de futebol do colégio conquistou o primeiro lugar no torneio distrital, com uma vitória por 3–1 na final.',
    data: '28 Set 2026',
    categoria: "Dep'",
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Escola_Eiffel_%28Angola-Bengo%29_P1049_05-07-12.jpg/1280px-Escola_Eiffel_%28Angola-Bengo%29_P1049_05-07-12.jpg',
    imagemAlt: 'Alunos de uma escola angolana numa actividade desportiva ao ar livre',
  },
  {
    id: 'feira-ciencias',
    titulo: 'Feira de ciências apresenta projectos dos alunos',
    resumo:
      'Durante dois dias, os alunos do 2.º Ciclo apresentaram projectos de energia solar, reciclagem e agricultura urbana à comunidade.',
    data: '05 Out 2026',
    categoria: "Cul'",
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Escola_Eiffel_%28Angola-Bengo%29_P1050_05-07-12.jpg/1280px-Escola_Eiffel_%28Angola-Bengo%29_P1050_05-07-12.jpg',
    imagemAlt: 'Alunos de uma escola em Bengo, Angola, numa apresentação em grupo',
  },
  {
    id: 'dia-familia',
    titulo: 'Dia da família angolana junta pais e alunos',
    resumo:
      'Música, dança tradicional e um almoço partilhado marcaram a celebração do Dia da Família Angolana no pavilhão do colégio.',
    data: '09 Out 2026',
    categoria: "Com'",
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Escola_Eiffel_%28Angola-Bengo%29_P1128_05-07-12.jpg/1280px-Escola_Eiffel_%28Angola-Bengo%29_P1128_05-07-12.jpg',
    imagemAlt: 'Alunos e professores de uma escola angolana reunidos em celebração',
  },
  {
    id: 'biblioteca-livros',
    titulo: 'Biblioteca escolar recebe novos livros de leitura',
    resumo:
      'Mais de 300 títulos de literatura angolana e universal passaram a estar disponíveis para empréstimo a todas as turmas.',
    data: '14 Out 2026',
    categoria: "Cul'",
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Adult_literacy_students_%285687218318%29.jpg/1280px-Adult_literacy_students_%285687218318%29.jpg',
    imagemAlt: 'Participantes num programa de literacia em Luanda, Angola',
  },
  {
    id: 'visita-museu',
    titulo: 'Visita de estudo ao Museu Nacional de História Natural',
    resumo:
      'Os alunos do 1.º Ciclo conheceram a exposição de fauna angolana e participaram numa oficina de desenho de campo.',
    data: '18 Out 2026',
    categoria: "Evt'",
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Skola_i_provinsen_Huambo%2C_Angola.jpg/1280px-Skola_i_provinsen_Huambo%2C_Angola.jpg',
    imagemAlt: 'Escola numa zona rural da província do Huambo, Angola',
  },
];
