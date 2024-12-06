import { useState } from 'react';
import { PersonalStats } from '../../types/stats';
import { Plus, X } from 'lucide-react';

interface PersonalStatsFormProps {
  onSubmit: (stats: Omit<PersonalStats, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  initialData?: PersonalStats;
}

export default function PersonalStatsForm({ onSubmit, onCancel, initialData }: PersonalStatsFormProps) {
  const [weight, setWeight] = useState(initialData?.weight?.toString() ?? '');
  const [height, setHeight] = useState(initialData?.height?.toString() ?? '');
  const [age, setAge] = useState(initialData?.age?.toString() ?? '');
  const [bodyFatPercentage, setBodyFatPercentage] = useState(
    initialData?.bodyFatPercentage?.toString() ?? ''
  );
  const [notes, setNotes] = useState(initialData?.notes ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date: new Date().toISOString().split('T')[0],
      weight: Number(weight),
      height: Number(height),
      age: Number(age),
      bodyFatPercentage: bodyFatPercentage ? Number(bodyFatPercentage) : undefined,
      notes: notes || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Weight (kg) *</label>
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Height (cm) *</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Age *</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Body Fat %</label>
          <input
            type="number"
            step="0.1"
            value={bodyFatPercentage}
            onChange={(e) => setBodyFatPercentage(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500 h-24"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors flex items-center"
        >
          <X size={18} className="mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition-colors flex items-center"
        >
          <Plus size={18} className="mr-2" />
          {initialData ? 'Update' : 'Add'} Stats
        </button>
      </div>
    </form>
  );
}