import { useQuery } from '@tanstack/react-query';
import { getParticipantes } from '../services/participanteService';
import { Participante } from '../types/api';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

const Participantes = () => {
  const { data, isLoading, error } = useQuery<Participante[], AxiosError>({
    queryKey: ['participantes'],
    queryFn: getParticipantes,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    toast.error('Erro ao carregar participantes. Por favor, tente novamente mais tarde.');
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar participantes</h2>
        <p className="text-gray-600">
          Ocorreu um erro ao carregar os participantes. Por favor, tente novamente mais tarde.
        </p>
      </div>
    );
  }

  const participantes = data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Participantes</h1>
      
      {participantes.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-600">Nenhum participante encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {participantes.map((participante: Participante) => (
            <div key={participante.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{participante.nome}</h2>
              <p className="text-gray-600 mb-2">{participante.email}</p>
              <p className="text-sm text-gray-500">
                Telefone: {participante.telefone}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Participantes; 