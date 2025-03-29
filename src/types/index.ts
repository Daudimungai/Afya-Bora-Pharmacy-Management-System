export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'pharmacist' | 'staff';
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  medicalHistory: string[];
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  expiryDate: string;
  category: string;
  manufacturer: string;
  reorderLevel: number;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorName: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  medications: {
    medicineId: string;
    quantity: number;
    dosage: string;
  }[];
}

export interface Sale {
  id: string;
  patientId: string;
  prescriptionId?: string;
  date: string;
  items: {
    medicineId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  paymentMethod: 'cash' | 'card';
  status: 'completed' | 'refunded';
}