import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaDumbbell, FaList, FaHome, FaDatabase } from 'react-icons/fa';

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const NavContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const NavLink = styled(Link)`
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textSecondary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export function Navigation() {
  const location = useLocation();

  return (
    <Nav>
      <NavContainer>
        <NavLink to="/" $active={location.pathname === '/'}>
          <FaHome /> Home
        </NavLink>
        <NavLink to="/exercises" $active={location.pathname === '/exercises'}>
          <FaList /> Exercises
        </NavLink>
        <NavLink to="/workouts" $active={location.pathname === '/workouts'}>
          <FaDumbbell /> Workouts
        </NavLink>
        <NavLink to="/data" $active={location.pathname === '/data'}>
          <FaDatabase /> Data
        </NavLink>
      </NavContainer>
    </Nav>
  );
}