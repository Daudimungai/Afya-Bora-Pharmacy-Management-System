import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../store';
import type { Prescription } from '../types';

interface NewPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewPrescriptionModal({ isOpen, onClose }: NewPrescriptionModalProps) {
  const { addPrescription, medicines, patients } = useStore();
  const [formData, setFormData] = useState({
    patientId: '',
    doctorName: '',
    medications: [{ medicineId: '', quantity: '', dosage: '' }],
  });

  const handleAddMedication = () => {
    setFormData({
      ...formData,
      medications: [...formData.medications, { medicineId: '', quantity: '', dosage: '' }],
    });
  };

  const handleRemoveMedication = (index: number) => {
    setFormData({
      ...formData,
      medications: formData.medications.filter((_, i) => i !== index),
    });
  };

  const handleMedicationChange = (index: number, field: string, value: string) => {
    const newMedications = [...formData.medications];
    newMedications[index] = { ...newMedications[index], [field]: value };
    setFormData({ ...formData, medications: newMedications });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const prescription: Prescription = {
      id: crypto.randomUUID(),
      patientId: formData.patientId,
      doctorName: formData.doctorName,
      date: new Date().toISOString(),
      status: 'pending',
      medications: formData.medications.map(med => ({
        medicineId: med.medicineId,
        quantity: parseInt(med.quantity),
        dosage: med.dosage,
      })),
    };

    addPrescription(prescription);
    onClose();
    setFormData({
      patientId: '',
      doctorName: '',
      medications: [{ medicineId: '', quantity: '', dosage: '' }],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">New Prescription</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
                Patient
              </label>
              <select
                id="patientId"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
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
              <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700">
                Doctor Name
              </label>
              <input
                type="text"
                id="doctorName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={formData.doctorName}
                onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
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
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Medication
                </button>
              </div>

              {formData.medications.map((medication, index) => (
                <div key={index} className="flex gap-4 items-start mt-3 first:mt-0">
                  <div className="flex-1">
                    <select
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={medication.medicineId}
                      onChange={(e) => handleMedicationChange(index, 'medicineId', e.target.value)}
                    >
                      <option value="">Select a medicine</option>
                      {medicines.map((medicine) => (
                        <option key={medicine.id} value={medicine.id}>
                          {medicine.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-24">
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="Qty"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={medication.quantity}
                      onChange={(e) => handleMedicationChange(index, 'quantity', e.target.value)}
                    />
                  </div>

                  <div className="flex-1">
                    <input
                      type="text"
                      required
                      placeholder="Dosage instructions"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={medication.dosage}
                      onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                    />
                  </div>

                  {formData.medications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedication(index)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}