import React from 'react';
import { Users, BookOpen, UserCheck, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  counts: {
    members: number;
    instructors: number;
    classes: number;
    reservations: number;
  };
}

export const Dashboard: React.FC<DashboardProps> = ({ counts }) => {
  const stats = [
    { name: 'Socios Activos', value: counts.members, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Instructores', value: counts.instructors, icon: UserCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Clases Totales', value: counts.classes, icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Reservas Hoy', value: counts.reservations, icon: Calendar, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const chartData = [
    { name: 'Socios', count: counts.members },
    { name: 'Instr.', count: counts.instructors },
    { name: 'Clases', count: counts.classes },
    { name: 'Reservas', count: counts.reservations },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="overflow-hidden rounded-lg bg-white shadow border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md ${item.bg} p-3`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                    <dd className="text-2xl font-bold text-gray-900">{item.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-100 p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">Resumen de Actividad</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{fontSize: 12}} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="rounded-md bg-blue-50 p-4 border border-blue-100">
        <div className="flex">
          <div className="flex-shrink-0">
            <Users className="h-5 w-5 text-blue-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Bienvenido al Panel de Control</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Desde aquí puede gestionar todos los recursos del gimnasio de forma centralizada.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
