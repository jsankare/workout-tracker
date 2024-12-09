import { useState } from 'react';
import styled from 'styled-components';
import { ExerciseForm } from '../components/exercises/ExerciseForm';
import { ExerciseList } from '../components/exercises/ExerciseList';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export function Exercises() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <Container>
      <Title>Exercise Library</Title>
      <Section>
        <h2>Add New Exercise</h2>
        <ExerciseForm onExerciseAdded={() => setRefreshKey(prev => prev + 1)} />
      </Section>
      <Section>
        <h2>Your Exercises</h2>
        <ExerciseList refresh={refreshKey} />
      </Section>
    </Container>
  );
}