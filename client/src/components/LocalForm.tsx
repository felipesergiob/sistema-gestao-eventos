import { useState, useEffect } from 'react';
import { Local } from '../types/api';
import { createLocal, updateLocal } from '../services/localService';
import { toast } from 'react-hot-toast';

interface LocalFormProps {
  local?: Local;
  onSuccess: () => void;
  onCancel: () => void;
}

const LocalForm = ({ local, onSuccess, onCancel }: LocalFormProps) => {
  const [formData, setFormData] = useState<Partial<Local>>({
    nome: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    capacidade: 0
  });

  useEffect(() => {
    if (local) {
      setFormData(local);
    }
  }, [local]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (local?.id) {
        await updateLocal(local.id, formData);
        toast.success('Local atualizado com sucesso!');
      } else {
        await createLocal(formData as Omit<Local, 'id'>);
        toast.success('Local criado com sucesso!');
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar local:', error);
      toast.error('Erro ao salvar local. Por favor, tente novamente.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacidade' ? Number(value) : value
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
        <label className="block text-sm font-medium text-gray-700">Endereço</label>
        <input
          type="text"
          name="endereco"
          value={formData.endereco || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Cidade</label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <input
            type="text"
            name="estado"
            value={formData.estado || ''}
            onChange={handleChange}
            required
            maxLength={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">CEP</label>
        <input
          type="text"
          name="cep"
          value={formData.cep || ''}
          onChange={handleChange}
          required
          maxLength={8}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Capacidade</label>
        <input
          type="number"
          name="capacidade"
          value={formData.capacidade || 0}
          onChange={handleChange}
          required
          min={1}
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
          {local ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
};

export default LocalForm; 