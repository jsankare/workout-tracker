import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { getAllExercises, addWorkout } from '../../db';

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

const ExerciseList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ExerciseItem = styled(Card)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ExerciseInputs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-grow: 1;

  input {
    width: 80px;
  }
`;

export function WorkoutForm({ onWorkoutAdded }) {
  const [name, setName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [availableExercises, setAvailableExercises] = useState([]);

  useEffect(() => {
    const loadExercises = async () => {
      const data = await getAllExercises();
      setAvailableExercises(data);
    };
    loadExercises();
  }, []);

  const handleAddExercise = () => {
    setSelectedExercises([...selectedExercises, {
      exerciseId: '',
      sets: '',
      reps: '',
      weight: '',
      duration: ''
    }]);
  };

  const handleExerciseChange = (index, field, value) => {
    const updated = [...selectedExercises];
    updated[index] = { ...updated[index], [field]: value };

    if (field === 'exerciseId') {
      const exercise = availableExercises.find(ex => ex.id === parseInt(value));
      if (exercise) {
        updated[index] = {
          ...updated[index],
          sets: exercise.defaultSets || '',
          reps: exercise.defaultReps || '',
          duration: exercise.defaultDuration || '',
          measurementType: exercise.measurementType
        };
      }
    }

    setSelectedExercises(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = {
      name,
      exercises: selectedExercises.map(exercise => ({
        exerciseId: parseInt(exercise.exerciseId),
        sets: parseInt(exercise.sets),
        reps: parseInt(exercise.reps),
        weight: exercise.weight ? parseFloat(exercise.weight) : null,
        duration: exercise.duration ? parseInt(exercise.duration) : null
      }))
    };
    await addWorkout(workout);
    setName('');
    setSelectedExercises([]);
    onWorkoutAdded();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Workout Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Button type="button" onClick={handleAddExercise}>
        Add Exercise
      </Button>
      <ExerciseList>
        {selectedExercises.map((exercise, index) => {
          const selectedExercise = availableExercises.find(
            ex => ex.id === parseInt(exercise.exerciseId)
          );
          
          return (
            <ExerciseItem key={index}>
              <Select
                value={exercise.exerciseId}
                onChange={(e) => handleExerciseChange(index, 'exerciseId', e.target.value)}
                required
              >
                <option value="">Select Exercise</option>
                {availableExercises.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name} ({ex.category})
                  </option>
                ))}
              </Select>
              <ExerciseInputs>
                {selectedExercise?.measurementType !== 'time' && (
                  <>
                    <Input
                      type="number"
                      placeholder="Sets"
                      value={exercise.sets}
                      onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                      required
                      min="1"
                    />
                    <Input
                      type="number"
                      placeholder="Reps"
                      value={exercise.reps}
                      onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                      required
                      min="1"
                    />
                  </>
                )}
                
                {selectedExercise?.measurementType === 'weight' && (
                  <Input
                    type="number"
                    placeholder="Weight (kg)"
                    value={exercise.weight}
                    onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)}
                    step="0.5"
                    min="0"
                  />
                )}
                
                {selectedExercise?.measurementType === 'time' && (
                  <Input
                    type="number"
                    placeholder="Duration (sec)"
                    value={exercise.duration}
                    onChange={(e) => handleExerciseChange(index, 'duration', e.target.value)}
                    required
                    min="1"
                  />
                )}
              </ExerciseInputs>
            </ExerciseItem>
          );
        })}
      </ExerciseList>
      <Button type="submit">Create Workout</Button>
    </Form>
  );
}