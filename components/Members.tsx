import React, { useState } from 'react';
import { Member } from '../types';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { Plus, Pencil, Trash2, Search, User } from 'lucide-react';

interface MembersProps {
  data: Member[];
  onAdd: (m: Omit<Member, 'id'>) => void;
  onUpdate: (m: Member) => void;
  onDelete: (id: number) => void;
}

export const Members: React.FC<MembersProps> = ({ data, onAdd, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [formData, setFormData] = useState<Omit<Member, 'id'>>({
    nombre: '', apellido: '', dni: '', telefono: '', correo: ''
  });

  const resetForm = () => {
    setFormData({ nombre: '', apellido: '', dni: '', telefono: '', correo: '' });
    setEditingMember(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: Member) => {
    setEditingMember(member);
    setFormData({ 
      nombre: member.nombre, 
      apellido: member.apellido, 
      dni: member.dni, 
      telefono: member.telefono, 
      correo: member.correo 
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      onUpdate({ ...formData, id: editingMember.id });
    } else {
      onAdd(formData);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const filteredData = data.filter(m => 
    m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.dni.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Socios</h2>
          <p className="text-gray-500">Gestión completa de socios del gimnasio</p>
        </div>
        <Button onClick={handleOpenAdd} icon={<Plus className="w-4 h-4" />}>
          Nuevo Socio
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre, apellido o DNI..."
          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Completo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DNI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    No se encontraron socios
                  </td>
                </tr>
              ) : (
                filteredData.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.nombre} {member.apellido}</div>
                          <div className="text-sm text-gray-500">ID: {member.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.dni}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.correo}</div>
                      <div className="text-sm text-gray-500">{member.telefono}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleOpenEdit(member)} className="text-brand-600 hover:text-brand-900 mr-4">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => onDelete(member.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingMember ? "Editar Socio" : "Agregar Nuevo Socio"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input required type="text" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Apellido</label>
              <input required type="text" value={formData.apellido} onChange={e => setFormData({...formData, apellido: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">DNI</label>
            <input required type="text" value={formData.dni} onChange={e => setFormData({...formData, dni: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input required type="email" value={formData.correo} onChange={e => setFormData({...formData, correo: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input required type="tel" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500" />
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <Button type="submit" className="w-full sm:col-start-2">Guardar</Button>
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="mt-3 w-full sm:mt-0 sm:col-start-1">Cancelar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
