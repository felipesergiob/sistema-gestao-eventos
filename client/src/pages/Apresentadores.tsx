import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getApresentadores, deleteApresentador } from '../services/apresentadorService';
import { Apresentador } from '../types/api';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import ApresentadorForm from '../components/ApresentadorForm';

const Apresentadores = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedApresentador, setSelectedApresentador] = useState<Apresentador | undefined>();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Apresentador[], AxiosError>({
    queryKey: ['apresentadores'],
    queryFn: getApresentadores
  });

  const handleEdit = (apresentador: Apresentador) => {
    setSelectedApresentador(apresentador);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este apresentador?')) {
      try {
        await deleteApresentador(id);
        toast.success('Apresentador excluído com sucesso!');
        queryClient.invalidateQueries({ queryKey: ['apresentadores'] });
      } catch (error) {
        console.error('Erro ao excluir apresentador:', error);
        toast.error('Erro ao excluir apresentador. Por favor, tente novamente.');
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedApresentador(undefined);
    queryClient.invalidateQueries({ queryKey: ['apresentadores'] });
  };

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Apresentadores</h1>
        <button
          onClick={() => {
            setSelectedApresentador(undefined);
            setShowForm(true);
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Novo Apresentador
        </button>
      </div>
      
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
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(apresentador)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(apresentador.id)}
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
              {selectedApresentador ? 'Editar Apresentador' : 'Novo Apresentador'}
            </h2>
            <ApresentadorForm
              apresentador={selectedApresentador}
              onSuccess={handleFormSuccess}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Apresentadores; 