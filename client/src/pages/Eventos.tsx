import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEventos, deleteEvento } from '../services/eventoService';
import { Evento } from '../types/api';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import EventoForm from '../components/EventoForm';

const Eventos = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState<Evento | undefined>();
  const queryClient = useQueryClient();

  const { data: eventos, isLoading, error } = useQuery<Evento[], AxiosError>({
    queryKey: ['eventos'],
    queryFn: getEventos,
    retry: 1
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventos'] });
      toast.success('Evento deletado com sucesso!');
    },
    onError: (error: Error) => {
      console.error('Erro ao deletar evento:', error);
      toast.error('Erro ao deletar evento. Por favor, tente novamente.');
    }
  });

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este evento?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (evento: Evento) => {
    setSelectedEvento(evento);
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelectedEvento(undefined);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedEvento(undefined);
    queryClient.invalidateQueries({ queryKey: ['eventos'] });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    const errorMessage = error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data
      ? String(error.response.data.message)
      : 'Ocorreu um erro ao carregar os eventos. Por favor, tente novamente mais tarde.';

    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar eventos</h2>
        <p className="text-gray-600">{errorMessage}</p>
      </div>
    );
  }

  if (!eventos || eventos.length === 0) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Eventos</h1>
          <button
            onClick={handleCreate}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Novo Evento
          </button>
        </div>
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <p className="text-gray-600">Nenhum evento encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Eventos</h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Novo Evento
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((evento: Evento) => (
          <div key={evento.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{evento.titulo}</h2>
            <p className="text-gray-600 mb-2">{evento.descricao}</p>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Data: {new Date(evento.dataInicio).toLocaleDateString()} - {new Date(evento.dataFim).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">Local: {evento.local?.nome || 'Não definido'}</p>
              <p className="text-sm text-gray-600">Apresentador: {evento.apresentador?.nome || 'Não definido'}</p>
              <p className="text-sm text-gray-600">Capacidade: {evento.capacidade || 0} pessoas</p>
              <p className="text-sm text-gray-600">Valor: R$ {evento.valor ? evento.valor.toFixed(2) : '0.00'}</p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(evento)}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(evento.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {selectedEvento ? 'Editar Evento' : 'Novo Evento'}
            </h2>
            <EventoForm
              evento={selectedEvento}
              onSuccess={handleFormSuccess}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Eventos; 