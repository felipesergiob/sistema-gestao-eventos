import { Local } from '../types/api';
import { get, post, put, del } from './api';

export const getLocais = async () => {
  try {
    const response = await get<Local[]>('/api/locais');
    return response;
  } catch (error) {
    console.error('Erro ao buscar locais:', error);
    throw error;
  }
};

export const getLocal = async (id: number) => {
  try {
    const response = await get<Local>(`/api/locais/${id}`);
    return response;
  } catch (error) {
    console.error(`Erro ao buscar local ${id}:`, error);
    throw error;
  }
};

export const createLocal = async (local: Omit<Local, 'id'>) => {
  try {
    const response = await post<Local>('/api/locais', local);
    return response;
  } catch (error) {
    console.error('Erro ao criar local:', error);
    throw error;
  }
};

export const updateLocal = async (id: number, local: Partial<Local>) => {
  try {
    const response = await put<Local>(`/api/locais/${id}`, local);
    return response;
  } catch (error) {
    console.error(`Erro ao atualizar local ${id}:`, error);
    throw error;
  }
};

export const deleteLocal = async (id: number) => {
  try {
    const response = await del<void>(`/api/locais/${id}`);
    return response;
  } catch (error) {
    console.error(`Erro ao deletar local ${id}:`, error);
    throw error;
  }
}; 