export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface Evento {
  id: number;
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  local: Local;
  apresentador: Apresentador;
  capacidade: number;
  valor: number;
}

export interface Participante {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  empresa?: string;
  cpf: string;
  dataNascimento: string;
}

export interface Apresentador {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  empresa?: string;
  cpf: string;
  dataNascimento: string;
  especialidade: string;
  biografia?: string;
}

export interface Local {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  capacidade: number;
} 