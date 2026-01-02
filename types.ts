export interface Admin {
  id: number;
  usuario: string;
  nombre: string;
}

export interface Member {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  correo: string;
}

export interface Instructor {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  correo: string;
}

export interface GymClass {
  id: number;
  nombre: string;
  horario: string; // e.g., "Lun/Mie 10:00"
  cupo: number;
}

export interface Reservation {
  id: number;
  memberId: number;
  classId: number;
  fecha: string; // ISO Date string YYYY-MM-DD
}

export type ViewState = 'dashboard' | 'socios' | 'instructores' | 'clases' | 'reservas';
