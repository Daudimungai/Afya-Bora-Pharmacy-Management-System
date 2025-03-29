import { create } from 'zustand';
import type { User, Patient, Medicine, Prescription, Sale } from '../types';

interface Store {
  // Auth
  user: User | null;
  setUser: (user: User | null) => void;

  // Data
  patients: Patient[];
  medicines: Medicine[];
  prescriptions: Prescription[];
  sales: Sale[];

  // Actions
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  addMedicine: (medicine: Medicine) => void;
  updateMedicine: (id: string, medicine: Partial<Medicine>) => void;
  addPrescription: (prescription: Prescription) => void;
  updatePrescription: (id: string, prescription: Partial<Prescription>) => void;
  addSale: (sale: Sale) => void;
}

export const useStore = create<Store>((set) => ({
  // Initial state
  user: null,
  patients: [],
  medicines: [],
  prescriptions: [],
  sales: [],

  // Auth actions
  setUser: (user) => set({ user }),

  // Data actions
  addPatient: (patient) =>
    set((state) => ({ patients: [...state.patients, patient] })),
  updatePatient: (id, patient) =>
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === id ? { ...p, ...patient } : p
      ),
    })),

  addMedicine: (medicine) =>
    set((state) => ({ medicines: [...state.medicines, medicine] })),
  updateMedicine: (id, medicine) =>
    set((state) => ({
      medicines: state.medicines.map((m) =>
        m.id === id ? { ...m, ...medicine } : m
      ),
    })),

  addPrescription: (prescription) =>
    set((state) => ({ prescriptions: [...state.prescriptions, prescription] })),
  updatePrescription: (id, prescription) =>
    set((state) => ({
      prescriptions: state.prescriptions.map((p) =>
        p.id === id ? { ...p, ...prescription } : p
      ),
    })),

  addSale: (sale) => set((state) => ({ sales: [...state.sales, sale] })),
}));