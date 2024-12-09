import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../common/Button';
import { addExercise, getAllCategories, addCategory } from '../../db';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const Select = styled.select`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const TextArea = styled.textarea`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  min-height: 100px;
`;

const CategorySection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export function ExerciseForm({ onExerciseAdded }) {
  const [exercise, setExercise] = useState({
    name: '',
    description: '',
    category: '',
    measurementType: 'weight',
    defaultSets: 3,
    defaultReps: 10,
    defaultDuration: 60,
  });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExercise(exercise);
    setExercise({
      name: '',
      description: '',
      category: '',
      measurementType: 'weight',
      defaultSets: 3,
      defaultReps: 10,
      defaultDuration: 60,
    });
    onExerciseAdded();
  };

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      await addCategory(newCategory.trim());
      setNewCategory('');
      setShowNewCategory(false);
      loadCategories();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Exercise Name"
        value={exercise.name}
        onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
        required
      />
      
      <CategorySection>
        {!showNewCategory ? (
          <>
            <Select
              value={exercise.category}
              onChange={(e) => setExercise({ ...exercise, category: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </Select>
            <Button type="button" onClick={() => setShowNewCategory(true)}>
              New Category
            </Button>
          </>
        ) : (
          <>
            <Input
              placeholder="New Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button type="button" onClick={handleAddCategory}>
              Add
            </Button>
            <Button type="button" onClick={() => setShowNewCategory(false)}>
              Cancel
            </Button>
          </>
        )}
      </CategorySection>

      <Select
        value={exercise.measurementType}
        onChange={(e) => setExercise({ ...exercise, measurementType: e.target.value })}
        required
      >
        <option value="weight">Weight</option>
        <option value="time">Time</option>
        <option value="reps">Reps Only</option>
      </Select>

      {exercise.measurementType !== 'time' && (
        <>
          <Input
            type="number"
            placeholder="Default Sets"
            value={exercise.defaultSets}
            onChange={(e) => setExercise({ ...exercise, defaultSets: parseInt(e.target.value) })}
            min="1"
            required
          />
          <Input
            type="number"
            placeholder="Default Reps"
            value={exercise.defaultReps}
            onChange={(e) => setExercise({ ...exercise, defaultReps: parseInt(e.target.value) })}
            min="1"
            required
          />
        </>
      )}

      {exercise.measurementType === 'time' && (
        <Input
          type="number"
          placeholder="Default Duration (seconds)"
          value={exercise.defaultDuration}
          onChange={(e) => setExercise({ ...exercise, defaultDuration: parseInt(e.target.value) })}
          min="1"
          required
        />
      )}

      <TextArea
        placeholder="Description"
        value={exercise.description}
        onChange={(e) => setExercise({ ...exercise, description: e.target.value })}
        required
      />
      
      <Button type="submit">Add Exercise</Button>
    </Form>
  );
}