import { Participante } from '../types/api';
import { get, post, put, del } from './api';

export const getParticipantes = async () => {
  try {
    const response = await get<Participante[]>('/api/participantes');
    return response;
  } catch (error) {
    console.error('Erro ao buscar participantes:', error);
    throw error;
  }
};

export const getParticipante = async (id: number) => {
  try {
    const response = await get<Participante>(`/api/participantes/${id}`);
    return response;
  } catch (error) {
    console.error(`Erro ao buscar participante ${id}:`, error);
    throw error;
  }
};

export const createParticipante = async (participante: Omit<Participante, 'id'>) => {
  try {
    const response = await post<Participante>('/api/participantes', participante);
    return response;
  } catch (error) {
    console.error('Erro ao criar participante:', error);
    throw error;
  }
};

export const updateParticipante = async (id: number, participante: Partial<Participante>) => {
  try {
    const response = await put<Participante>(`/api/participantes/${id}`, participante);
    return response;
  } catch (error) {
    console.error(`Erro ao atualizar participante ${id}:`, error);
    throw error;
  }
};

export const deleteParticipante = async (id: number) => {
  try {
    const response = await del<void>(`/api/participantes/${id}`);
    return response;
  } catch (error) {
    console.error(`Erro ao deletar participante ${id}:`, error);
    throw error;
  }
}; 