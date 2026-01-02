import { useState, useEffect } from 'react';
import { Member, Instructor, GymClass, Reservation } from '../types';
import { INITIAL_MEMBERS, INITIAL_INSTRUCTORS, INITIAL_CLASSES, INITIAL_RESERVATIONS } from '../constants';

export const useGymStore = () => {
  // Initialize state from localStorage or fallback to constants
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('gym_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [instructors, setInstructors] = useState<Instructor[]>(() => {
    const saved = localStorage.getItem('gym_instructors');
    return saved ? JSON.parse(saved) : INITIAL_INSTRUCTORS;
  });

  const [classes, setClasses] = useState<GymClass[]>(() => {
    const saved = localStorage.getItem('gym_classes');
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('gym_reservations');
    return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
  });

  // Persist to localStorage whenever state changes
  useEffect(() => { localStorage.setItem('gym_members', JSON.stringify(members)); }, [members]);
  useEffect(() => { localStorage.setItem('gym_instructors', JSON.stringify(instructors)); }, [instructors]);
  useEffect(() => { localStorage.setItem('gym_classes', JSON.stringify(classes)); }, [classes]);
  useEffect(() => { localStorage.setItem('gym_reservations', JSON.stringify(reservations)); }, [reservations]);

  // Actions
  const addMember = (member: Omit<Member, 'id'>) => {
    const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
    setMembers([...members, { ...member, id: newId }]);
  };
  const updateMember = (updated: Member) => {
    setMembers(members.map(m => m.id === updated.id ? updated : m));
  };
  const deleteMember = (id: number) => {
    setMembers(members.filter(m => m.id !== id));
    // Also remove reservations for this member
    setReservations(reservations.filter(r => r.memberId !== id));
  };

  const addInstructor = (instructor: Omit<Instructor, 'id'>) => {
    const newId = instructors.length > 0 ? Math.max(...instructors.map(i => i.id)) + 1 : 1;
    setInstructors([...instructors, { ...instructor, id: newId }]);
  };
  const updateInstructor = (updated: Instructor) => {
    setInstructors(instructors.map(i => i.id === updated.id ? updated : i));
  };
  const deleteInstructor = (id: number) => {
    setInstructors(instructors.filter(i => i.id !== id));
  };

  const addClass = (gymClass: Omit<GymClass, 'id'>) => {
    const newId = classes.length > 0 ? Math.max(...classes.map(c => c.id)) + 1 : 1;
    setClasses([...classes, { ...gymClass, id: newId }]);
  };
  const updateClass = (updated: GymClass) => {
    setClasses(classes.map(c => c.id === updated.id ? updated : c));
  };
  const deleteClass = (id: number) => {
    setClasses(classes.filter(c => c.id !== id));
    setReservations(reservations.filter(r => r.classId !== id));
  };

  const addReservation = (reservation: Omit<Reservation, 'id'>) => {
    const newId = reservations.length > 0 ? Math.max(...reservations.map(r => r.id)) + 1 : 1;
    setReservations([...reservations, { ...reservation, id: newId }]);
  };
  const deleteReservation = (id: number) => {
    setReservations(reservations.filter(r => r.id !== id));
  };

  return {
    members, addMember, updateMember, deleteMember,
    instructors, addInstructor, updateInstructor, deleteInstructor,
    classes, addClass, updateClass, deleteClass,
    reservations, addReservation, deleteReservation
  };
};
