import { Evento } from '../types/api';
import { get, post, put, del } from './api';

export const getEventos = async () => {
  try {
    const response = await get<Evento[]>('/api/eventos');
    return response;
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    throw error;
  }
};

export const getEvento = async (id: number) => {
  try {
    const response = await get<Evento>(`/api/eventos/${id}`);
    return response;
  } catch (error) {
    console.error(`Erro ao buscar evento ${id}:`, error);
    throw error;
  }
};

export const createEvento = async (evento: Omit<Evento, 'id'>) => {
  try {
    console.log('Dados enviados para criação de evento:', JSON.stringify(evento, null, 2));
    const response = await post<Evento>('/api/eventos', evento);
    return response;
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    throw error;
  }
};

export const updateEvento = async (id: number, evento: Partial<Evento>) => {
  try {
    console.log(`Dados enviados para atualização do evento ${id}:`, JSON.stringify(evento, null, 2));
    const response = await put<Evento>(`/api/eventos/${id}`, evento);
    return response;
  } catch (error) {
    console.error(`Erro ao atualizar evento ${id}:`, error);
    throw error;
  }
};

export const deleteEvento = async (id: number) => {
  try {
    const response = await del<void>(`/api/eventos/${id}`);
    return response;
  } catch (error) {
    console.error(`Erro ao deletar evento ${id}:`, error);
    throw error;
  }
}; 