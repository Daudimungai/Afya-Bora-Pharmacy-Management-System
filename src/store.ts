import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  expiryDate: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  medicalHistory: string[];
}

export interface PrescriptionMedication {
  medicineId: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorName: string;
  date: string;
  medications: PrescriptionMedication[];
  notes: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface SaleItem {
  medicineId: string;
  quantity: number;
  price: number;
}

export interface Sale {
  id: string;
  date: string;
  items: SaleItem[];
  total: number;
  paymentMethod: 'cash' | 'card';
  status: 'completed' | 'pending';
}

interface Store {
  medicines: Medicine[];
  patients: Patient[];
  prescriptions: Prescription[];
  sales: Sale[];
  addMedicine: (medicine: Omit<Medicine, 'id'>) => void;
  updateMedicine: (id: string, updates: Partial<Medicine>) => void;
  deleteMedicine: (id: string) => void;
  addPatient: (patient: Omit<Patient, 'id'>) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  addPrescription: (prescription: Omit<Prescription, 'id'>) => void;
  updatePrescription: (id: string, updates: Partial<Prescription>) => void;
  deletePrescription: (id: string) => void;
  addSale: (items: SaleItem[], paymentMethod: 'cash' | 'card') => void;
  updateSale: (id: string, updates: Partial<Sale>) => void;
  deleteSale: (id: string) => void;
  updateMedicineStock: (medicineId: string, quantity: number) => void;
}

// Initial data for the store
const initialState = {
  medicines: [
    {
      id: uuidv4(),
      name: "Panadol",
      description: "Pain reliever and fever reducer (Paracetamol 500mg)",
      price: 250.00,
      stock: 500,
      category: "Pain Relief",
      expiryDate: "2024-12-31"
    },
    {
      id: uuidv4(),
      name: "Augmentin",
      description: "Antibiotic (Amoxicillin/Clavulanic Acid)",
      price: 850.00,
      stock: 300,
      category: "Antibiotics",
      expiryDate: "2024-06-30"
    },
    {
      id: uuidv4(),
      name: "Artemether/Lumefantrine",
      description: "Antimalarial medication",
      price: 480.00,
      stock: 400,
      category: "Antimalarial",
      expiryDate: "2024-08-31"
    },
    {
      id: uuidv4(),
      name: "Ventolin Inhaler",
      description: "Asthma relief inhaler (Salbutamol)",
      price: 750.00,
      stock: 250,
      category: "Respiratory",
      expiryDate: "2024-11-30"
    },
    {
      id: uuidv4(),
      name: "Metformin",
      description: "Diabetes medication 500mg",
      price: 350.00,
      stock: 400,
      category: "Diabetes",
      expiryDate: "2024-10-31"
    },
    {
      id: uuidv4(),
      name: "Omeprazole",
      description: "Acid reflux and ulcer medication 20mg",
      price: 400.00,
      stock: 350,
      category: "Gastrointestinal",
      expiryDate: "2024-09-30"
    },
    {
      id: uuidv4(),
      name: "Amoxicillin",
      description: "Antibiotic 500mg",
      price: 300.00,
      stock: 450,
      category: "Antibiotics",
      expiryDate: "2024-07-31"
    },
    {
      id: uuidv4(),
      name: "Diclofenac",
      description: "Anti-inflammatory pain reliever 50mg",
      price: 200.00,
      stock: 400,
      category: "Pain Relief",
      expiryDate: "2024-12-31"
    },
    {
      id: uuidv4(),
      name: "Amlodipine",
      description: "Blood pressure medication 5mg",
      price: 450.00,
      stock: 300,
      category: "Cardiovascular",
      expiryDate: "2024-11-30"
    },
    {
      id: uuidv4(),
      name: "Zinc Supplements",
      description: "Immune system support 20mg",
      price: 280.00,
      stock: 500,
      category: "Supplements",
      expiryDate: "2024-12-31"
    },
    {
      id: uuidv4(),
      name: "Cetrizine",
      description: "Antihistamine for allergies 10mg",
      price: 150.00,
      stock: 600,
      category: "Allergy",
      expiryDate: "2024-10-31"
    },
    {
      id: uuidv4(),
      name: "Metronidazole",
      description: "Antibiotic for bacterial infections 400mg",
      price: 280.00,
      stock: 400,
      category: "Antibiotics",
      expiryDate: "2024-09-30"
    },
    {
      id: uuidv4(),
      name: "Hydrocortisone Cream",
      description: "Anti-inflammatory skin cream 1%",
      price: 350.00,
      stock: 300,
      category: "Topical",
      expiryDate: "2024-08-31"
    },
    {
      id: uuidv4(),
      name: "Vitamin B Complex",
      description: "Essential B vitamins supplement",
      price: 420.00,
      stock: 450,
      category: "Supplements",
      expiryDate: "2024-12-31"
    },
    {
      id: uuidv4(),
      name: "Ibuprofen",
      description: "Pain reliever and anti-inflammatory 400mg",
      price: 180.00,
      stock: 500,
      category: "Pain Relief",
      expiryDate: "2024-11-30"
    }
  ],
  patients: [],
  prescriptions: [],
  sales: []
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      ...initialState,
      
      addMedicine: (medicine) =>
        set((state) => ({
          medicines: [...state.medicines, { ...medicine, id: uuidv4() }],
        })),
        
      updateMedicine: (id, updates) =>
        set((state) => ({
          medicines: state.medicines.map((medicine) =>
            medicine.id === id ? { ...medicine, ...updates } : medicine
          ),
        })),
        
      deleteMedicine: (id) =>
        set((state) => ({
          medicines: state.medicines.filter((medicine) => medicine.id !== id),
        })),

      addPatient: (patient) =>
        set((state) => ({
          patients: [...state.patients, { ...patient, id: uuidv4() }],
        })),
        
      updatePatient: (id, updates) =>
        set((state) => ({
          patients: state.patients.map((patient) =>
            patient.id === id ? { ...patient, ...updates } : patient
          ),
        })),
        
      deletePatient: (id) =>
        set((state) => ({
          patients: state.patients.filter((patient) => patient.id !== id),
        })),

      addPrescription: (prescription) =>
        set((state) => ({
          prescriptions: [...state.prescriptions, { ...prescription, id: uuidv4() }],
        })),
        
      updatePrescription: (id, updates) =>
        set((state) => ({
          prescriptions: state.prescriptions.map((prescription) =>
            prescription.id === id ? { ...prescription, ...updates } : prescription
          ),
        })),
        
      deletePrescription: (id) =>
        set((state) => ({
          prescriptions: state.prescriptions.filter((prescription) => prescription.id !== id),
        })),
        
      addSale: (items, paymentMethod) =>
        set((state) => {
          const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
          const newSale: Sale = {
            id: uuidv4(),
            date: new Date().toISOString(),
            items,
            total,
            paymentMethod,
            status: 'completed',
          };
          
          // Update medicine stock
          const updatedMedicines = state.medicines.map((medicine) => {
            const saleItem = items.find((item) => item.medicineId === medicine.id);
            if (saleItem) {
              return {
                ...medicine,
                stock: medicine.stock - saleItem.quantity,
              };
            }
            return medicine;
          });
          
          return {
            sales: [...state.sales, newSale],
            medicines: updatedMedicines,
          };
        }),
        
      updateSale: (id, updates) =>
        set((state) => ({
          sales: state.sales.map((sale) =>
            sale.id === id ? { ...sale, ...updates } : sale
          ),
        })),
        
      deleteSale: (id) =>
        set((state) => ({
          sales: state.sales.filter((sale) => sale.id !== id),
        })),
        
      updateMedicineStock: (medicineId, quantity) =>
        set((state) => ({
          medicines: state.medicines.map((medicine) =>
            medicine.id === medicineId
              ? { ...medicine, stock: medicine.stock + quantity }
              : medicine
          ),
        })),
    }),
    {
      name: 'pharmacy-store',
      skipHydration: false,
      partialize: (state) => ({
        medicines: state.medicines,
        patients: state.patients,
        prescriptions: state.prescriptions,
        sales: state.sales,
      }),
    }
  )
); 