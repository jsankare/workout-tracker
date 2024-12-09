import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../common/Card';
import { getAllExercises } from '../../db';

const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ExerciseCard = styled(Card)`
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
  }
`;

const Category = styled.span`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.8rem;
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: inline-block;
`;

export function ExerciseList({ refresh }) {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const loadExercises = async () => {
      const data = await getAllExercises();
      setExercises(data);
    };
    loadExercises();
  }, [refresh]);

  return (
    <List>
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id}>
          <h3>{exercise.name}</h3>
          <p>{exercise.description}</p>
          <Category>{exercise.category}</Category>
        </ExerciseCard>
      ))}
    </List>
  );
}