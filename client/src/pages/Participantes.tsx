import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getParticipantes, deleteParticipante } from '../services/participanteService';
import { Participante } from '../types/api';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import ParticipanteForm from '../components/ParticipanteForm';

const Participantes = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedParticipante, setSelectedParticipante] = useState<Participante | undefined>();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Participante[], AxiosError>({
    queryKey: ['participantes'],
    queryFn: getParticipantes,
  });

  const handleEdit = (participante: Participante) => {
    setSelectedParticipante(participante);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este participante?')) {
      try {
        await deleteParticipante(id);
        toast.success('Participante deletado com sucesso!');
        queryClient.invalidateQueries({ queryKey: ['participantes'] });
      } catch (error) {
        toast.error('Erro ao deletar participante');
        console.error('Erro ao deletar participante:', error);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedParticipante(undefined);
    queryClient.invalidateQueries({ queryKey: ['participantes'] });
  };

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <button
          onClick={() => {
            setSelectedParticipante(undefined);
            setShowForm(true);
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Novo Participante
        </button>
      </div>
      
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
              <p className="text-sm text-gray-500 mb-1">
                Telefone: {participante.telefone}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Empresa: {participante.empresa}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                CPF: {participante.cpf}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Data de Nascimento: {participante.dataNascimento ? new Date(participante.dataNascimento).toLocaleDateString() : 'Não informada'}
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(participante)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(participante.id)}
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
              {selectedParticipante ? 'Editar Participante' : 'Novo Participante'}
            </h2>
            <ParticipanteForm
              participante={selectedParticipante}
              onSuccess={handleFormSuccess}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Participantes; 