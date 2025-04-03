export interface Local {
    id: number;
    nome: string;
    endereco: string;
    capacidade: number;
}

export interface Apresentador {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    biografia: string;
    especialidade: string;
}

export interface Participante {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    empresa: string;
}

export interface Evento {
    id: number;
    titulo: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    localId: number;
    apresentadorId: number;
    capacidadeMaxima: number;
    nomeLocal: string;
    nomeApresentador: string;
}

export interface Inscricao {
    id: number;
    eventoId: number;
    participanteId: number;
    dataInscricao: string;
    status: 'CONFIRMADA' | 'CANCELADA' | 'PENDENTE';
    nomeEvento: string;
    nomeParticipante: string;
} 