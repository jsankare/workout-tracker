import { useState } from 'react';
import { Download, Upload, AlertCircle } from 'lucide-react';
import { exportData, importData } from '../../utils/importExport';
import { Exercise } from '../../types/exercise';
import { Workout } from '../../types/workout';
import { PersonalStats } from '../../types/stats';

interface ImportExportSectionProps {
  exercises: Exercise[];
  workouts: Workout[];
  personalStats: PersonalStats[];
  onImportComplete: () => void;
}

export default function ImportExportSection({
  exercises,
  workouts,
  personalStats,
  onImportComplete,
}: ImportExportSectionProps) {
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleExport = async () => {
    try {
      await exportData(exercises, workouts, personalStats);
    } catch (error) {
      setError('Failed to export data. Please try again.');
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await importData(file);
      setSuccess(
        `Successfully imported ${result.exercises} exercises, ${result.workouts} workouts, and ${result.personalStats} personal stats records.`
      );
      onImportComplete();
    } catch (error) {
      setError('Failed to import data. Please check the file format and try again.');
    } finally {
      setImporting(false);
      event.target.value = '';
      setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Data Management</h2>
      
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition-colors flex items-center"
        >
          <Download size={18} className="mr-2" />
          Export Data
        </button>

        <label className="relative">
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={importing}
          />
          <span className={`px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors flex items-center cursor-pointer ${
            importing ? 'opacity-50 cursor-not-allowed' : ''
          }`}>
            <Upload size={18} className="mr-2" />
            {importing ? 'Importing...' : 'Import Data'}
          </span>
        </label>
      </div>

      {(error || success) && (
        <div className={`mt-4 p-3 rounded-md flex items-start gap-2 ${
          error ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
        }`}>
          <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error || success}</p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-400">
        <p>• Export your data to create a backup or transfer to another device</p>
        <p>• Import previously exported data to restore your workout history</p>
      </div>
    </div>
  );
}