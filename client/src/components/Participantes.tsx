import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getParticipantes, deleteParticipante } from '../services/participanteService';
import { Participante } from '../types/api';
import ParticipanteForm from './ParticipanteForm';
import { toast } from 'react-hot-toast';

const Participantes = () => {
  const [selectedParticipante, setSelectedParticipante] = useState<Participante | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: participantes, isLoading, error } = useQuery({
    queryKey: ['participantes'],
    queryFn: getParticipantes
  });

  const deleteMutation = useMutation({
    mutationFn: deleteParticipante,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participantes'] });
      toast.success('Participante excluído com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao excluir participante. Por favor, tente novamente.');
    }
  });

  const handleEdit = (participante: Participante) => {
    setSelectedParticipante(participante);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este participante?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedParticipante(undefined);
  };

  if (isLoading) {
    return <div className="text-center">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Erro ao carregar participantes</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Novo Participante
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {selectedParticipante ? 'Editar Participante' : 'Novo Participante'}
            </h2>
            <ParticipanteForm
              participante={selectedParticipante}
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedParticipante(undefined);
              }}
            />
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Empresa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CPF
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data de Nascimento
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {participantes?.map((participante) => (
              <tr key={participante.id}>
                <td className="px-6 py-4 whitespace-nowrap">{participante.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap">{participante.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{participante.telefone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{participante.empresa}</td>
                <td className="px-6 py-4 whitespace-nowrap">{participante.cpf}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(participante.dataNascimento).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(participante)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(participante.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Participantes; 