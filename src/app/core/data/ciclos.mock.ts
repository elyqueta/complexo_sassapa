import { Ciclo } from '../models/ciclo';

// TODO(colégio): conteúdo de exemplo — confirmar nomes, classes e números.
export const CICLOS_MOCK: readonly Ciclo[] = [
  {
    slug: 'iniciacao',
    nome: 'Iniciação',
    resumo:
      'Os primeiros passos na escola, num ambiente seguro e estimulante, onde a brincadeira é o principal caminho para a aprendizagem.',
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Skola_i_provinsen_Huambo%2C_Angola.jpg/1280px-Skola_i_provinsen_Huambo%2C_Angola.jpg',
    imagemAlt: 'Crianças numa escola rural do Huambo, Angola',
    responsavel: { nome: 'Ana Paulino', cargo: 'Coordenadora da Iniciação' },
    classes: ['Creche', 'Pré-escolar 1', 'Pré-escolar 2'],
    cursos: ['Expressão plástica', 'Musicalidade', 'Psicomotricidade'],
    planoFerias: 'Programa de férias com actividades lúdicas e oficinas de expressão.',
    extracurriculares: ['Natação', 'Inglês lúdico', 'Ballet'],
    formacoes: ['Workshop de literacia emocional para pais'],
    stats: [
      { label: 'Classes', valor: 4 },
      { label: 'Alunos por turma', valor: 18 },
      { label: 'Professores', valor: 9 },
    ],
  },
  {
    slug: 'ensino-primario',
    nome: 'Ensino Primário',
    resumo:
      'A consolidação da leitura, da escrita e do cálculo, com projectos que ligam a sala de aula à vida da comunidade.',
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/3/38/Kuito_class.jpg',
    imagemAlt: 'Sala de aula no Kuito, Bié, Angola',
    responsavel: { nome: 'João Mucavel', cargo: 'Coordenador do Ensino Primário' },
    classes: ['1.ª classe', '2.ª classe', '3.ª classe', '4.ª classe', '5.ª classe', '6.ª classe'],
    cursos: ['Língua Portuguesa', 'Matemática', 'Estudo do Meio', 'Educação Musical'],
    planoFerias: 'Reforço de leitura e matemática em regime de manhãs livres.',
    extracurriculares: ['Futebol', 'Xadrez', 'Coro infantil'],
    formacoes: ['Metodologias activas de leitura'],
    stats: [
      { label: 'Classes', valor: 6 },
      { label: 'Alunos por turma', valor: 24 },
      { label: 'Professores', valor: 16 },
    ],
  },
  {
    slug: 'primeiro-ciclo',
    nome: '1.º Ciclo',
    resumo:
      'A passagem para o ensino por disciplinas, com acompanhamento tutorial e hábitos de estudo que duram uma vida.',
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Imag_escola_ensino_medio_luena_moxico.jpg/1280px-Imag_escola_ensino_medio_luena_moxico.jpg',
    imagemAlt: 'Escola do instituto médio do Luena, Moxico, Angola',
    responsavel: { nome: 'Marta Capewa', cargo: 'Coordenadora do 1.º Ciclo' },
    classes: ['7.ª classe', '8.ª classe', '9.ª classe'],
    cursos: ['Matemática', 'Física', 'Química', 'História', 'Geografia', 'Inglês'],
    planoFerias: 'Cursos intensivos de preparação para os exames de transição.',
    extracurriculares: ['Basquetebol', 'Robótica', 'Teatro'],
    formacoes: ['Técnicas de estudo e gestão do tempo'],
    stats: [
      { label: 'Classes', valor: 7 },
      { label: 'Alunos por turma', valor: 28 },
      { label: 'Professores', valor: 18 },
    ],
  },
  {
    slug: 'segundo-ciclo',
    nome: '2.º Ciclo',
    resumo:
      'Aprofundamento das ciências e das humanidades, com laboratório, projectos de investigação e orientação vocacional.',
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Escola_Eiffel_%28Angola-Bengo%29_P1050_05-07-12.jpg/1280px-Escola_Eiffel_%28Angola-Bengo%29_P1050_05-07-12.jpg',
    imagemAlt: 'Alunos de uma escola em Bengo, Angola, numa actividade de grupo',
    responsavel: { nome: 'Adilson Kasuya', cargo: 'Coordenador do 2.º Ciclo' },
    classes: ['10.ª classe', '11.ª classe', '12.ª classe', '13.ª classe'],
    cursos: ['Biologia', 'Geometria descritiva', 'Desenho', 'Economia', 'Francês'],
    planoFerias: 'Preparação para os exames nacionais e feiras de ciências.',
    extracurriculares: ['Andebol', 'Jornal escolar', 'Clube de debate'],
    formacoes: ['Orientação vocacional e escolha de carreira'],
    stats: [
      { label: 'Classes', valor: 9 },
      { label: 'Alunos por turma', valor: 30 },
      { label: 'Professores', valor: 16 },
    ],
  },
  {
    slug: 'ensino-medio',
    nome: 'Ensino Médio',
    resumo:
      'A conclusão do percurso escolar com preparação intensiva para o exame nacional e para o ingresso no ensino superior.',
    imagem:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Escola_Eiffel_%28Angola-Bengo%29_P1331_29-06-12.jpg/1280px-Escola_Eiffel_%28Angola-Bengo%29_P1331_29-06-12.jpg',
    imagemAlt: 'Alunos de uma escola angolana em sala de aula',
    responsavel: { nome: 'Teresa Nkomba', cargo: 'Coordenadora do Ensino Médio' },
    classes: ['10.ª classe (ciências)', '11.ª classe (ciências)', '12.ª classe (humanidades)'],
    cursos: ['Matemática avançada', 'Física', 'Química', 'Filosofia', 'Literatura angolana'],
    planoFerias: 'Simulados semanais e revisão intensiva de exames.',
    extracurriculares: ['Voleibol', 'Empreendedorismo', 'Fotografia'],
    formacoes: ['Workshops de candidatura ao ensino superior'],
    stats: [
      { label: 'Classes', valor: 6 },
      { label: 'Alunos por turma', valor: 26 },
      { label: 'Professores', valor: 9 },
    ],
  },
];
