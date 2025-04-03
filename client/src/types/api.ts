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
  capacidadeMaxima: number;
  preco: number;
}

export interface Participante {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
}

export interface Apresentador {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  biografia: string;
  especialidade: string;
}

export interface Local {
  id: number;
  nome: string;
  endereco: string;
  capacidade: number;
} 