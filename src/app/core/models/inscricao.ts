export interface Candidato {
  nomeCompleto: string;
  dataNascimento: string;
  genero: 'masculino' | 'feminino' | '';
  cicloDesejado: string;
  escolaAnterior?: string;
}

export interface Encarregado {
  nomeCompleto: string;
  parentesco: string;
  telefone: string;
  email: string;
  morada: string;
}

export interface Documentos {
  bi: File | null;
  outros: File[];
}

export interface Inscricao {
  candidato: Candidato;
  encarregado: Encarregado;
  documentos: Documentos;
}
