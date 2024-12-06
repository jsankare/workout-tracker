import { useState } from 'react';
import { Exercise, MuscleGroup, Muscle, Category } from '../../types/exercise';
import { Plus, X } from 'lucide-react';

interface ExerciseFormProps {
  onSubmit: (exercise: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  initialData?: Exercise;
}

const muscleGroups: MuscleGroup[] = ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Full Body'];
const muscles: Muscle[] = ['Pectoralis', 'Latissimus', 'Deltoids', 'Biceps', 'Triceps', 'Quadriceps', 'Hamstrings', 'Calves', 'Abdominals', 'Trapezius', 'Rhomboids'];
const categories: Category[] = ['Strength', 'Cardio', 'Flexibility', 'Balance', 'Power', 'Endurance'];

export default function ExerciseForm({ onSubmit, onCancel, initialData }: ExerciseFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<MuscleGroup[]>(initialData?.muscleGroups ?? []);
  const [selectedMuscles, setSelectedMuscles] = useState<Muscle[]>(initialData?.muscles ?? []);
  const [category, setCategory] = useState<Category>(initialData?.category ?? 'Strength');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      muscleGroups: selectedMuscleGroups,
      muscles: selectedMuscles,
      category,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg">
      <div>
        <label className="block text-sm font-medium mb-2">Exercise Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500 h-32"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Muscle Groups *</label>
        <div className="flex flex-wrap gap-2">
          {muscleGroups.map((group) => (
            <button
              key={group}
              type="button"
              onClick={() => {
                setSelectedMuscleGroups(
                  selectedMuscleGroups.includes(group)
                    ? selectedMuscleGroups.filter((g) => g !== group)
                    : [...selectedMuscleGroups, group]
                )
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedMuscleGroups.includes(group)
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-700 text-white'
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Muscles *</label>
        <div className="flex flex-wrap gap-2">
          {muscles.map((muscle) => (
            <button
              key={muscle}
              type="button"
              onClick={() => {
                setSelectedMuscles(
                  selectedMuscles.includes(muscle)
                    ? selectedMuscles.filter((m) => m !== muscle)
                    : [...selectedMuscles, muscle]
                )
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedMuscles.includes(muscle)
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-700 text-white'
              }`}
            >
              {muscle}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Category *</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
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
          {initialData ? 'Update' : 'Add'} Exercise
        </button>
      </div>
    </form>
  );
}