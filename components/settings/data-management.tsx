"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Download, Upload } from 'lucide-react';
import { exportData, importData } from '@/lib/utils/data-management';

export function DataManagement() {
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      await exportData();
      toast({
        title: 'Export successful',
        description: 'Your data has been exported successfully.',
      });
    } catch (error) {
      toast({
        title: 'Export failed',
        description: 'Failed to export data. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const result = await importData(file);
      toast({
        title: result.success ? 'Import successful' : 'Import failed',
        description: result.message,
        variant: result.success ? 'default' : 'destructive',
      });
    } catch (error) {
      toast({
        title: 'Import failed',
        description: 'Failed to import data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsImporting(false);
      e.target.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>Export or import your workout data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            onClick={handleExport}
            className="flex-1 gap-2"
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <div className="flex-1">
            <Input
              type="file"
              accept=".json"
              onChange={handleImport}
              disabled={isImporting}
              className="hidden"
              id="import-file"
            />
            <Button
              asChild
              variant="outline"
              className="w-full gap-2"
              disabled={isImporting}
            >
              <label htmlFor="import-file" className="cursor-pointer">
                <Upload className="h-4 w-4" />
                Import Data
              </label>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}