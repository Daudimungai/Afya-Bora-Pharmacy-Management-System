import React, { useState } from 'react';
import { useStore } from '../store';
import { X, Plus, Minus } from 'lucide-react';

interface NewPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MedicationInput {
  medicineId: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export function NewPrescriptionModal({ isOpen, onClose }: NewPrescriptionModalProps) {
  const { medicines, patients, addPrescription } = useStore();
  const [formData, setFormData] = useState({
    patientId: '',
    doctorName: '',
    notes: '',
  });
  const [medications, setMedications] = useState<MedicationInput[]>([
    { medicineId: '', dosage: '', frequency: '', duration: '' },
  ]);

  const handleAddMedication = () => {
    setMedications([
      ...medications,
      { medicineId: '', dosage: '', frequency: '', duration: '' },
    ]);
  };

  const handleRemoveMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleMedicationChange = (index: number, field: keyof MedicationInput, value: string) => {
    const newMedications = [...medications];
    newMedications[index] = { ...newMedications[index], [field]: value };
    setMedications(newMedications);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addPrescription({
      patientId: formData.patientId,
      doctorName: formData.doctorName,
      date: new Date().toISOString(),
      medications: medications.filter(med => med.medicineId && med.dosage),
      notes: formData.notes,
      status: 'pending',
    });
    
    onClose();
    setFormData({
      patientId: '',
      doctorName: '',
      notes: '',
    });
    setMedications([{ medicineId: '', dosage: '', frequency: '', duration: '' }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">New Prescription</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient
            </label>
            <select
              required
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor Name
            </label>
            <input
              type="text"
              required
              value={formData.doctorName}
              onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Medications
              </label>
              <button
                type="button"
                onClick={handleAddMedication}
                className="text-blue-500 hover:text-blue-600"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              {medications.map((medication, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <select
                    required
                    value={medication.medicineId}
                    onChange={(e) => handleMedicationChange(index, 'medicineId', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select medicine</option>
                    {medicines.map((medicine) => (
                      <option key={medicine.id} value={medicine.id}>
                        {medicine.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Dosage"
                    required
                    value={medication.dosage}
                    onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                    className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Frequency"
                    required
                    value={medication.frequency}
                    onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                    className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    required
                    value={medication.duration}
                    onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                    className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {medications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedication(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Create Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}