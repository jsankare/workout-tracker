import { useState } from 'react';
import styled from 'styled-components';
import { WorkoutForm } from '../components/workouts/WorkoutForm';
import { WorkoutList } from '../components/workouts/WorkoutList';

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

export function Workouts() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <Container>
      <Title>Workouts</Title>
      <Section>
        <h2>Create New Workout</h2>
        <WorkoutForm onWorkoutAdded={() => setRefreshKey(prev => prev + 1)} />
      </Section>
      <Section>
        <h2>Your Workouts</h2>
        <WorkoutList refresh={refreshKey} />
      </Section>
    </Container>
  );
}