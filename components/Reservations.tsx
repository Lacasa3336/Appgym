import React, { useState } from 'react';
import { Reservation, Member, GymClass } from '../types';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { Plus, Trash2, CalendarCheck, User, Clock } from 'lucide-react';

interface ReservationsProps {
  reservations: Reservation[];
  members: Member[];
  classes: GymClass[];
  onAdd: (r: Omit<Reservation, 'id'>) => void;
  onDelete: (id: number) => void;
}

export const Reservations: React.FC<ReservationsProps> = ({ reservations, members, classes, onAdd, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<{memberId: string, classId: string, fecha: string}>({
    memberId: '', classId: '', fecha: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.memberId && formData.classId) {
      onAdd({
        memberId: parseInt(formData.memberId),
        classId: parseInt(formData.classId),
        fecha: formData.fecha
      });
      setIsModalOpen(false);
      setFormData({ memberId: '', classId: '', fecha: new Date().toISOString().split('T')[0] });
    }
  };

  // Helper to get names
  const getMemberName = (id: number) => {
    const m = members.find(m => m.id === id);
    return m ? `${m.nombre} ${m.apellido}` : 'Socio Desconocido';
  };

  const getClassName = (id: number) => {
    const c = classes.find(c => c.id === id);
    return c ? `${c.nombre} (${c.horario})` : 'Clase Desconocida';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reservas</h2>
          <p className="text-gray-500">Gestión manual de asistencia</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
          Nueva Reserva
        </Button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {reservations.length === 0 ? (
            <li className="px-6 py-10 text-center text-gray-500">No hay reservas registradas.</li>
          ) : (
            reservations.map((res) => (
              <li key={res.id} className="px-6 py-4 hover:bg-gray-50 flex items-center justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center w-full">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <CalendarCheck className="h-5 w-5" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <User className="w-3 h-3 text-gray-400" />
                        {getMemberName(res.memberId)}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {getClassName(res.classId)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 ml-14 sm:ml-4 text-sm text-gray-500">
                    {new Date(res.fecha).toLocaleDateString()}
                  </div>
                </div>
                <button onClick={() => onDelete(res.id)} className="ml-4 text-gray-400 hover:text-red-600 p-2">
                  <Trash2 className="h-5 w-5" />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Agregar Reserva Manual">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Socio</label>
            <select required value={formData.memberId} onChange={e => setFormData({...formData, memberId: e.target.value})} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-md border">
              <option value="">Seleccione un socio</option>
              {members.map(m => (
                <option key={m.id} value={m.id}>{m.nombre} {m.apellido} - DNI: {m.dni}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Clase</label>
            <select required value={formData.classId} onChange={e => setFormData({...formData, classId: e.target.value})} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-md border">
              <option value="">Seleccione una clase</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.nombre} - {c.horario} (Cupo: {c.cupo})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha</label>
            <input required type="date" value={formData.fecha} onChange={e => setFormData({...formData, fecha: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500" />
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <Button type="submit" className="w-full sm:col-start-2">Crear Reserva</Button>
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="mt-3 w-full sm:mt-0 sm:col-start-1">Cancelar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
