import { Estatistica } from '../models/estatistica';

// TODO(colégio): valores de exemplo — confirmar números oficiais antes de publicar.
export const ESTATISTICAS_MOCK: readonly Estatistica[] = [
  {
    id: 'alunos',
    valor: 1240,
    label: 'Alunos',
    descricao: 'Do pré-escolar ao Ensino Médio',
  },
  {
    id: 'professores',
    valor: 68,
    label: 'Professores',
    descricao: 'Quadro qualificado e em formação contínua',
  },
  {
    id: 'anos',
    valor: 15,
    label: 'Anos de actividade',
    descricao: 'Ao serviço da educação em Luanda',
  },
  {
    id: 'turmas',
    valor: 32,
    label: 'Turmas',
    descricao: 'Turmas com número reduzido de alunos',
  },
];
