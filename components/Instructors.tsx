import React, { useState } from 'react';
import { Instructor } from '../types';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { Plus, Pencil, Trash2, Search, Award } from 'lucide-react';

interface InstructorsProps {
  data: Instructor[];
  onAdd: (i: Omit<Instructor, 'id'>) => void;
  onUpdate: (i: Instructor) => void;
  onDelete: (id: number) => void;
}

export const Instructors: React.FC<InstructorsProps> = ({ data, onAdd, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState<Omit<Instructor, 'id'>>({
    nombre: '', apellido: '', dni: '', telefono: '', correo: ''
  });

  const resetForm = () => {
    setFormData({ nombre: '', apellido: '', dni: '', telefono: '', correo: '' });
    setEditingInstructor(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (instructor: Instructor) => {
    setEditingInstructor(instructor);
    setFormData({ 
      nombre: instructor.nombre, 
      apellido: instructor.apellido, 
      dni: instructor.dni, 
      telefono: instructor.telefono, 
      correo: instructor.correo 
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingInstructor) {
      onUpdate({ ...formData, id: editingInstructor.id });
    } else {
      onAdd(formData);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const filteredData = data.filter(i => 
    i.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.apellido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Instructores</h2>
          <p className="text-gray-500">Administración del equipo docente</p>
        </div>
        <Button onClick={handleOpenAdd} icon={<Plus className="w-4 h-4" />}>
          Nuevo Instructor
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar instructor..."
          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {filteredData.length === 0 ? (
            <li className="px-6 py-10 text-center text-gray-500">No hay instructores registrados.</li>
          ) : (
            filteredData.map((instructor) => (
              <li key={instructor.id} className="px-6 py-4 hover:bg-gray-50 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{instructor.nombre} {instructor.apellido}</div>
                    <div className="text-sm text-gray-500">{instructor.correo} • {instructor.telefono}</div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => handleOpenEdit(instructor)} className="text-gray-400 hover:text-brand-600">
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button onClick={() => onDelete(instructor.id)} className="text-gray-400 hover:text-red-600">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingInstructor ? "Editar Instructor" : "Nuevo Instructor"}>
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
