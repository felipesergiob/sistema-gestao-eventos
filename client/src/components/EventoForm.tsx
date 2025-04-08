import { useState, useEffect } from 'react';
import { Evento, Local, Apresentador } from '../types/api';
import { createEvento, updateEvento } from '../services/eventoService';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { getLocais } from '../services/localService';
import { getApresentadores } from '../services/apresentadorService';

interface EventoFormProps {
  evento?: Evento;
  onSuccess: () => void;
  onCancel: () => void;
}

const EventoForm = ({ evento, onSuccess, onCancel }: EventoFormProps) => {
  const [formData, setFormData] = useState<Partial<Evento>>({
    titulo: '',
    descricao: '',
    dataInicio: '',
    dataFim: '',
    capacidade: 0,
    valor: 0,
    local: { 
      id: 0, 
      nome: '', 
      endereco: '', 
      cidade: '',
      estado: '',
      cep: '',
      capacidade: 0 
    },
    apresentador: { 
      id: 0, 
      nome: '', 
      email: '', 
      telefone: '', 
      biografia: '', 
      especialidade: '',
      cpf: '',
      dataNascimento: ''
    }
  });

  const { data: locais } = useQuery<Local[]>({
    queryKey: ['locais'],
    queryFn: getLocais
  });

  const { data: apresentadores } = useQuery<Apresentador[]>({
    queryKey: ['apresentadores'],
    queryFn: getApresentadores
  });

  useEffect(() => {
    if (evento) {
      const dataInicio = evento.dataInicio.split('T')[0];
      const dataFim = evento.dataFim.split('T')[0];
      
      setFormData({
        ...evento,
        dataInicio,
        dataFim
      });
    }
  }, [evento]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataParaEnviar = {
        ...formData,
        dataInicio: `${formData.dataInicio}T00:00:00`,
        dataFim: `${formData.dataFim}T23:59:59`
      };
      
      if (evento?.id) {
        await updateEvento(evento.id, dataParaEnviar);
        toast.success('Evento atualizado com sucesso!');
      } else {
        await createEvento(dataParaEnviar as Omit<Evento, 'id'>);
        toast.success('Evento criado com sucesso!');
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      toast.error('Erro ao salvar evento. Por favor, tente novamente.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'localId') {
      const local = locais?.find(l => l.id === Number(value));
      setFormData(prev => ({
        ...prev,
        local: local || { 
          id: 0, 
          nome: '', 
          endereco: '', 
          cidade: '',
          estado: '',
          cep: '',
          capacidade: 0 
        }
      }));
    } else if (name === 'apresentadorId') {
      const apresentador = apresentadores?.find(a => a.id === Number(value));
      setFormData(prev => ({
        ...prev,
        apresentador: apresentador || { 
          id: 0, 
          nome: '', 
          email: '', 
          telefone: '', 
          biografia: '', 
          especialidade: '',
          cpf: '',
          dataNascimento: ''
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'capacidade' || name === 'valor' ? Number(value) : value
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Data de Início</label>
          <input
            type="date"
            name="dataInicio"
            value={formData.dataInicio}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Data de Término</label>
          <input
            type="date"
            name="dataFim"
            value={formData.dataFim}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Local</label>
          <select
            name="localId"
            value={formData.local?.id || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione um local</option>
            {locais?.map(local => (
              <option key={local.id} value={local.id}>
                {local.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Apresentador</label>
          <select
            name="apresentadorId"
            value={formData.apresentador?.id || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione um apresentador</option>
            {apresentadores?.map(apresentador => (
              <option key={apresentador.id} value={apresentador.id}>
                {apresentador.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Capacidade</label>
          <input
            type="number"
            name="capacidade"
            value={formData.capacidade}
            onChange={handleChange}
            required
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Valor</label>
          <input
            type="number"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {evento ? 'Atualizar' : 'Criar'} Evento
        </button>
      </div>
    </form>
  );
};

export default EventoForm; 