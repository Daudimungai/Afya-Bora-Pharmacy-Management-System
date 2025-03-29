import React, { useState } from 'react';
import { useStore } from '../store';
import { Search, X, Plus, Minus } from 'lucide-react';

interface NewSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SelectedItem {
  medicineId: string;
  name: string;
  quantity: number;
  price: number;
}

export function NewSaleModal({ isOpen, onClose }: NewSaleModalProps) {
  const { medicines, addSale } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddItem = (medicine: typeof medicines[0]) => {
    const existingItem = selectedItems.find((item) => item.medicineId === medicine.id);
    if (existingItem) {
      setSelectedItems(
        selectedItems.map((item) =>
          item.medicineId === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedItems([
        ...selectedItems,
        {
          medicineId: medicine.id,
          name: medicine.name,
          quantity: 1,
          price: medicine.price,
        },
      ]);
    }
  };

  const handleUpdateQuantity = (medicineId: string, delta: number) => {
    setSelectedItems(
      selectedItems.map((item) => {
        if (item.medicineId === medicineId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return newQuantity === 0
            ? null
            : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as SelectedItem[]
    );
  };

  const handleSubmit = () => {
    if (selectedItems.length === 0) return;

    const saleItems = selectedItems.map((item) => ({
      medicineId: item.medicineId,
      quantity: item.quantity,
      price: item.price,
    }));

    addSale(saleItems, paymentMethod);
    onClose();
    setSelectedItems([]);
    setSearchTerm('');
    setPaymentMethod('cash');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">New Sale</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {searchTerm && (
            <div className="mt-2 max-h-40 overflow-y-auto border rounded-lg">
              {filteredMedicines.map((medicine) => (
                <button
                  key={medicine.id}
                  onClick={() => handleAddItem(medicine)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex justify-between items-center"
                >
                  <span>{medicine.name}</span>
                  <span className="text-gray-500">${medicine.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedItems.length > 0 && (
          <div className="mb-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Item</th>
                  <th className="text-right py-2">Quantity</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedItems.map((item) => (
                  <tr key={item.medicineId} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.medicineId, -1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.medicineId, 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    <td className="text-right py-2">${item.price.toFixed(2)}</td>
                    <td className="text-right py-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mb-4">
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => setPaymentMethod(e.target.value as 'cash')}
                className="mr-2"
              />
              Cash
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                className="mr-2"
              />
              Card
            </label>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            Total: ${total.toFixed(2)}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedItems.length === 0}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete Sale
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 