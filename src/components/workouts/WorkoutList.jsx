import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../common/Card';
import { getAllWorkouts, getAllExercises } from '../../db';

const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const WorkoutCard = styled(Card)`
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const WorkoutDate = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ExerciseGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ExerciseItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const formatExerciseDetails = (exercise, exerciseData) => {
  const template = exerciseData[exercise.exerciseId];
  if (!template) return '';

  if (template.measurementType === 'time') {
    return `${exercise.duration} seconds`;
  }

  let details = `${exercise.sets} sets × ${exercise.reps} reps`;
  if (template.measurementType === 'weight' && exercise.weight) {
    details += ` @ ${exercise.weight}kg`;
  }
  return details;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function WorkoutList({ refresh }) {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const [workoutData, exerciseData] = await Promise.all([
        getAllWorkouts(),
        getAllExercises()
      ]);
      
      const exerciseMap = {};
      exerciseData.forEach(exercise => {
        exerciseMap[exercise.id] = exercise;
      });
      
      setExercises(exerciseMap);
      setWorkouts(workoutData);
    };
    loadData();
  }, [refresh]);

  return (
    <List>
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id}>
          <h3>{workout.name}</h3>
          <WorkoutDate>{formatDate(workout.date)}</WorkoutDate>
          <ExerciseGrid>
            {workout.exercises.map((exercise, index) => (
              <ExerciseItem key={index}>
                <span>{exercises[exercise.exerciseId]?.name}</span>
                <span>{formatExerciseDetails(exercise, exercises)}</span>
              </ExerciseItem>
            ))}
          </ExerciseGrid>
        </WorkoutCard>
      ))}
    </List>
  );
}