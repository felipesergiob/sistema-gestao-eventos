import { useQuery } from '@tanstack/react-query';
import { getApresentadores } from '../services/apresentadorService';
import { Apresentador } from '../types/api';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

const Apresentadores = () => {
  const { data, isLoading, error } = useQuery<Apresentador[], AxiosError>({
    queryKey: ['apresentadores'],
    queryFn: getApresentadores
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    toast.error('Erro ao carregar apresentadores. Por favor, tente novamente mais tarde.');
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar apresentadores</h2>
        <p className="text-gray-600">
          Ocorreu um erro ao carregar os apresentadores. Por favor, tente novamente mais tarde.
        </p>
      </div>
    );
  }

  const apresentadores = data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Apresentadores</h1>
      
      {apresentadores.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-600">Nenhum apresentador encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apresentadores.map((apresentador: Apresentador) => (
            <div key={apresentador.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{apresentador.nome}</h2>
              <p className="text-gray-600 mb-2">{apresentador.especialidade}</p>
              <p className="text-sm text-gray-500 mb-2">{apresentador.biografia}</p>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Email: {apresentador.email}</p>
                <p className="text-sm text-gray-600">Telefone: {apresentador.telefone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Apresentadores; 