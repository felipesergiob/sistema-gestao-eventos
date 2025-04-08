import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getLocais, deleteLocal } from '../services/localService';
import { Local } from '../types/api';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import LocalForm from '../components/LocalForm';

const Locais = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState<Local | undefined>();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Local[], AxiosError>({
    queryKey: ['locais'],
    queryFn: getLocais,
  });

  const handleEdit = (local: Local) => {
    setSelectedLocal(local);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este local?')) {
      try {
        await deleteLocal(id);
        toast.success('Local excluído com sucesso!');
        queryClient.invalidateQueries({ queryKey: ['locais'] });
      } catch (error) {
        console.error('Erro ao excluir local:', error);
        toast.error('Erro ao excluir local. Por favor, tente novamente.');
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedLocal(undefined);
    queryClient.invalidateQueries({ queryKey: ['locais'] });
  };

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Locais</h1>
        <button
          onClick={() => {
            setSelectedLocal(undefined);
            setShowForm(true);
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Novo Local
        </button>
      </div>
      
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
              <p className="text-sm text-gray-500 mb-2">
                {local.cidade}, {local.estado} - CEP: {local.cep}
              </p>
              <p className="text-sm text-gray-500">
                Capacidade: {local.capacidade} pessoas
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(local)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(local.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {selectedLocal ? 'Editar Local' : 'Novo Local'}
            </h2>
            <LocalForm
              local={selectedLocal}
              onSuccess={handleFormSuccess}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Locais; 