import { create } from 'zustand';
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
  sales: Sale[];
  addMedicine: (medicine: Omit<Medicine, 'id'>) => void;
  updateMedicine: (id: string, updates: Partial<Medicine>) => void;
  deleteMedicine: (id: string) => void;
  addSale: (items: SaleItem[], paymentMethod: 'cash' | 'card') => void;
  updateSale: (id: string, updates: Partial<Sale>) => void;
  deleteSale: (id: string) => void;
  updateMedicineStock: (medicineId: string, quantity: number) => void;
}

export const useStore = create<Store>((set) => ({
  medicines: [],
  sales: [],
  
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
})); 