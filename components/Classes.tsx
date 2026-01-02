import React, { useState } from 'react';
import { GymClass } from '../types';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { Plus, Pencil, Trash2, Calendar, Users } from 'lucide-react';

interface ClassesProps {
  data: GymClass[];
  onAdd: (c: Omit<GymClass, 'id'>) => void;
  onUpdate: (c: GymClass) => void;
  onDelete: (id: number) => void;
}

export const Classes: React.FC<ClassesProps> = ({ data, onAdd, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<GymClass | null>(null);
  
  const [formData, setFormData] = useState<Omit<GymClass, 'id'>>({
    nombre: '', horario: '', cupo: 10
  });

  const resetForm = () => {
    setFormData({ nombre: '', horario: '', cupo: 10 });
    setEditingClass(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cls: GymClass) => {
    setEditingClass(cls);
    setFormData({ 
      nombre: cls.nombre, 
      horario: cls.horario, 
      cupo: cls.cupo 
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClass) {
      onUpdate({ ...formData, id: editingClass.id });
    } else {
      onAdd(formData);
    }
    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clases</h2>
          <p className="text-gray-500">Horarios y cupos disponibles</p>
        </div>
        <Button onClick={handleOpenAdd} icon={<Plus className="w-4 h-4" />}>
          Nueva Clase
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((cls) => (
          <div key={cls.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleOpenEdit(cls)} className="p-1 text-gray-400 hover:text-indigo-600 rounded">
                    <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => onDelete(cls.id)} className="p-1 text-gray-400 hover:text-red-600 rounded">
                    <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-1">{cls.nombre}</h3>
            <p className="text-sm text-gray-500 mb-4">{cls.horario}</p>
            
            <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-md">
              <Users className="h-4 w-4 mr-2" />
              <span>Cupo máximo: <strong>{cls.cupo}</strong> personas</span>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingClass ? "Editar Clase" : "Nueva Clase"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre de la Actividad</label>
            <input required type="text" placeholder="Ej: Crossfit" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Horario</label>
            <input required type="text" placeholder="Ej: Lun/Mie 18:00" value={formData.horario} onChange={e => setFormData({...formData, horario: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cupo Máximo</label>
            <input required type="number" min="1" value={formData.cupo} onChange={e => setFormData({...formData, cupo: parseInt(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500" />
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
