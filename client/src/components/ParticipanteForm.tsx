import { useState, useEffect } from 'react';
import { Participante } from '../types/api';
import { createParticipante, updateParticipante } from '../services/participanteService';
import { toast } from 'react-hot-toast';

interface ParticipanteFormProps {
  participante?: Participante;
  onSuccess: () => void;
  onCancel: () => void;
}

const ParticipanteForm = ({ participante, onSuccess, onCancel }: ParticipanteFormProps) => {
  const [formData, setFormData] = useState<Partial<Participante>>({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    cpf: '',
    dataNascimento: ''
  });

  useEffect(() => {
    if (participante) {
      setFormData({
        ...participante,
        dataNascimento: participante.dataNascimento ? participante.dataNascimento.split('T')[0] : ''
      });
    }
  }, [participante]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const participanteFormatado = {
        ...formData,
        dataNascimento: formData.dataNascimento ? formData.dataNascimento : null
      };
      
      if (participante?.id) {
        await updateParticipante(participante.id, participanteFormatado);
        toast.success('Participante atualizado com sucesso!');
      } else {
        await createParticipante(participanteFormatado as Omit<Participante, 'id'>);
        toast.success('Participante criado com sucesso!');
      }
      onSuccess();
    } catch (error: any) {
      console.error('Erro ao salvar participante:', error);
      const mensagemErro = error.message || 'Erro ao salvar participante. Por favor, tente novamente.';
      toast.error(mensagemErro);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <label className="block text-sm font-medium text-gray-700">Empresa</label>
        <input
          type="text"
          name="empresa"
          value={formData.empresa || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">CPF</label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
        <input
          type="date"
          name="dataNascimento"
          value={formData.dataNascimento || ''}
          onChange={handleChange}
          required
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
          {participante ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
};

export default ParticipanteForm; 