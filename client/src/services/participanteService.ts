import { Participante } from '../types/api';
import api from './api';

export const getParticipantes = async (): Promise<Participante[]> => {
  try {
    const response = await api.get<Participante[]>('/api/participantes');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar participantes:', error);
    throw error;
  }
};

export const getParticipante = async (id: number): Promise<Participante> => {
  try {
    const response = await api.get<Participante>(`/api/participantes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar participante ${id}:`, error);
    throw error;
  }
};

export const createParticipante = async (participante: Omit<Participante, 'id'>): Promise<Participante> => {
  try {
    // Garantir que a data esteja no formato correto (YYYY-MM-DD)
    const participanteFormatado = {
      ...participante,
      dataNascimento: participante.dataNascimento.split('T')[0]
    };

    const response = await api.post<Participante>('/api/participantes', participanteFormatado, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar participante:', error);
    throw error;
  }
};

export const updateParticipante = async (id: number, participante: Partial<Participante>): Promise<Participante> => {
  try {
    // Garantir que a data esteja no formato correto (YYYY-MM-DD)
    const participanteFormatado = {
      ...participante,
      dataNascimento: participante.dataNascimento ? participante.dataNascimento.split('T')[0] : undefined
    };

    const response = await api.put<Participante>(`/api/participantes/${id}`, participanteFormatado, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar participante ${id}:`, error);
    throw error;
  }
};

export const deleteParticipante = async (id: number): Promise<void> => {
  try {
    await api.delete(`/api/participantes/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar participante ${id}:`, error);
    throw error;
  }
}; 