import { Apresentador } from '../types/api';
import { get, post, put, del } from './api';

export const getApresentadores = async () => {
  try {
    const response = await get<Apresentador[]>('/api/apresentadores');
    return response;
  } catch (error) {
    console.error('Erro ao buscar apresentadores:', error);
    throw error;
  }
};

export const getApresentador = async (id: number) => {
  try {
    const response = await get<Apresentador>(`/api/apresentadores/${id}`);
    return response;
  } catch (error) {
    console.error(`Erro ao buscar apresentador ${id}:`, error);
    throw error;
  }
};

export const createApresentador = async (apresentador: Omit<Apresentador, 'id'>) => {
  try {
    const response = await post<Apresentador>('/api/apresentadores', apresentador);
    return response;
  } catch (error) {
    console.error('Erro ao criar apresentador:', error);
    throw error;
  }
};

export const updateApresentador = async (id: number, apresentador: Partial<Apresentador>) => {
  try {
    const response = await put<Apresentador>(`/api/apresentadores/${id}`, apresentador);
    return response;
  } catch (error) {
    console.error(`Erro ao atualizar apresentador ${id}:`, error);
    throw error;
  }
};

export const deleteApresentador = async (id: number) => {
  try {
    const response = await del<void>(`/api/apresentadores/${id}`);
    return response;
  } catch (error) {
    console.error(`Erro ao deletar apresentador ${id}:`, error);
    throw error;
  }
}; 