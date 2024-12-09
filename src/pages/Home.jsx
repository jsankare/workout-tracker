import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FeatureCard = styled(Card)`
  text-align: center;
  
  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export function Home() {
  return (
    <Container>
      <Title>Workout Tracker</Title>
      <Grid>
        <FeatureCard>
          <h2>Exercise Library</h2>
          <p>Create and manage your custom exercise database</p>
          <Link to="/exercises">
            <Button>View Exercises</Button>
          </Link>
        </FeatureCard>
        <FeatureCard>
          <h2>Workouts</h2>
          <p>Design and track your workout routines</p>
          <Link to="/workouts">
            <Button>View Workouts</Button>
          </Link>
        </FeatureCard>
      </Grid>
    </Container>
  );
}