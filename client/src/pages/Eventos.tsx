import { useQuery } from '@tanstack/react-query';
import { getEventos } from '../services/eventoService';
import { Evento } from '../types/api';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

const Eventos = () => {
  const { data, isLoading, error } = useQuery<Evento[], AxiosError>({
    queryKey: ['eventos'],
    queryFn: getEventos
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    toast.error('Erro ao carregar eventos. Por favor, tente novamente mais tarde.');
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar eventos</h2>
        <p className="text-gray-600">
          Ocorreu um erro ao carregar os eventos. Por favor, tente novamente mais tarde.
        </p>
      </div>
    );
  }

  const eventos = data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Eventos</h1>
      
      {eventos.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-600">Nenhum evento encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.map((evento: Evento) => (
            <div key={evento.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{evento.titulo}</h2>
              <p className="text-gray-600 mb-2">{evento.descricao}</p>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Data: {new Date(evento.dataInicio).toLocaleDateString()} - {new Date(evento.dataFim).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">Local: {evento.local.nome}</p>
                <p className="text-sm text-gray-600">Apresentador: {evento.apresentador.nome}</p>
                <p className="text-sm text-gray-600">Capacidade: {evento.capacidadeMaxima} pessoas</p>
                <p className="text-sm text-gray-600">Preço: R$ {evento.preco.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Eventos; 