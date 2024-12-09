import { useState } from 'react';
import styled from 'styled-components';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { exportData, importData } from '../db';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FileInput = styled.input`
  display: none;
`;

const Message = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme, $type }) => 
    $type === 'success' ? theme.colors.success + '20' : 
    $type === 'error' ? theme.colors.error + '20' : 
    'transparent'};
  color: ${({ theme, $type }) => 
    $type === 'success' ? theme.colors.success : 
    $type === 'error' ? theme.colors.error : 
    theme.colors.text};
`;

export function DataManagement() {
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleExport = async () => {
    try {
      const data = await exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `workout-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setMessage({ text: 'Data exported successfully!', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Failed to export data', type: 'error' });
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      await importData(data);
      setMessage({ text: 'Data imported successfully!', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Failed to import data. Please check the file format.', type: 'error' });
    }
    event.target.value = '';
  };

  return (
    <Container>
      <Title>Data Management</Title>
      
      <Section>
        <SectionTitle>Export Data</SectionTitle>
        <Description>
          Download all your exercises, workouts, and categories as a JSON file.
        </Description>
        <Button onClick={handleExport}>Export Data</Button>
      </Section>

      <Section>
        <SectionTitle>Import Data</SectionTitle>
        <Description>
          Import previously exported data. Warning: This will replace all existing data.
        </Description>
        <FileInput
          type="file"
          id="import-file"
          accept=".json"
          onChange={handleImport}
        />
        <Button as="label" htmlFor="import-file">
          Import Data
        </Button>
      </Section>

      {message.text && (
        <Message $type={message.type}>
          {message.text}
        </Message>
      )}
    </Container>
  );
}