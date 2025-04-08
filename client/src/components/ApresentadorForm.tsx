import { useState, useEffect } from 'react';
import { Apresentador } from '../types/api';
import { createApresentador, updateApresentador } from '../services/apresentadorService';
import { toast } from 'react-hot-toast';

interface ApresentadorFormProps {
  apresentador?: Apresentador;
  onSuccess: () => void;
  onCancel: () => void;
}

const ApresentadorForm = ({ apresentador, onSuccess, onCancel }: ApresentadorFormProps) => {
  const [formData, setFormData] = useState<Partial<Apresentador>>({
    nome: '',
    email: '',
    telefone: '',
    especialidade: '',
    biografia: ''
  });

  useEffect(() => {
    if (apresentador) {
      setFormData(apresentador);
    }
  }, [apresentador]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (apresentador?.id) {
        await updateApresentador(apresentador.id, formData);
        toast.success('Apresentador atualizado com sucesso!');
      } else {
        await createApresentador(formData as Omit<Apresentador, 'id'>);
        toast.success('Apresentador criado com sucesso!');
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar apresentador:', error);
      toast.error('Erro ao salvar apresentador. Por favor, tente novamente.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          name="nome"
          value={formData.nome || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Telefone</label>
        <input
          type="tel"
          name="telefone"
          value={formData.telefone || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Especialidade</label>
        <input
          type="text"
          name="especialidade"
          value={formData.especialidade || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Biografia</label>
        <textarea
          name="biografia"
          value={formData.biografia || ''}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {apresentador ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
};

export default ApresentadorForm; 