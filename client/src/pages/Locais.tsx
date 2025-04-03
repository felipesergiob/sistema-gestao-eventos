import { useQuery } from '@tanstack/react-query';
import { getLocais } from '../services/localService';
import { Local } from '../types/api';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

const Locais = () => {
  const { data, isLoading, error } = useQuery<Local[], AxiosError>({
    queryKey: ['locais'],
    queryFn: getLocais,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    toast.error('Erro ao carregar locais. Por favor, tente novamente mais tarde.');
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar locais</h2>
        <p className="text-gray-600">
          Ocorreu um erro ao carregar os locais. Por favor, tente novamente mais tarde.
        </p>
      </div>
    );
  }

  const locais = data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Locais</h1>
      
      {locais.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-600">Nenhum local encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locais.map((local: Local) => (
            <div key={local.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{local.nome}</h2>
              <p className="text-gray-600 mb-2">{local.endereco}</p>
              <p className="text-sm text-gray-500">
                Capacidade: {local.capacidade} pessoas
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Locais; 