import { Member, Instructor, GymClass, Reservation } from './types';

export const INITIAL_MEMBERS: Member[] = [
  { id: 1, nombre: "Juan", apellido: "Perez", dni: "12345678", telefono: "555-0101", correo: "juan@example.com" },
  { id: 2, nombre: "Maria", apellido: "Gomez", dni: "87654321", telefono: "555-0202", correo: "maria@example.com" },
  { id: 3, nombre: "Carlos", apellido: "Lopez", dni: "11223344", telefono: "555-0303", correo: "carlos@example.com" },
  { id: 4, nombre: "Ana", apellido: "Martinez", dni: "44332211", telefono: "555-0404", correo: "ana@example.com" },
  { id: 5, nombre: "Luis", apellido: "Rodriguez", dni: "99887766", telefono: "555-0505", correo: "luis@example.com" },
];

export const INITIAL_INSTRUCTORS: Instructor[] = [
  { id: 1, nombre: "Pedro", apellido: "Sarmiento", dni: "90909090", telefono: "555-1010", correo: "pedro@gym.com" },
  { id: 2, nombre: "Lucia", apellido: "Fernandez", dni: "80808080", telefono: "555-2020", correo: "lucia@gym.com" },
];

export const INITIAL_CLASSES: GymClass[] = [
  { id: 1, nombre: "Crossfit", horario: "Lun/Mie/Vie 08:00", cupo: 20 },
  { id: 2, nombre: "Yoga", horario: "Mar/Jue 18:00", cupo: 15 },
  { id: 3, nombre: "Spinning", horario: "Lun/Mie 19:00", cupo: 25 },
  { id: 4, nombre: "Boxeo", horario: "Vie 17:00", cupo: 10 },
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  { id: 1, memberId: 1, classId: 1, fecha: new Date().toISOString().split('T')[0] },
  { id: 2, memberId: 2, classId: 2, fecha: new Date().toISOString().split('T')[0] },
];
