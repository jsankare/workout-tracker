"use client";

import { useState } from 'react';
import { Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIndexedDB } from '@/lib/hooks/use-indexeddb';
import { WorkoutTemplate } from '@/lib/types/workout';
import { TemplateList } from '@/components/templates/template-list';
import { TemplateForm } from '@/components/templates/template-form';
import { useToast } from '@/components/ui/use-toast';

export default function TemplatesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: templates, loading, addItem, updateItem } = useIndexedDB<WorkoutTemplate[]>('workoutTemplates');
  const { toast } = useToast();

  const handleSaveTemplate = async (template: WorkoutTemplate) => {
    const success = await addItem(template);
    if (success) {
      toast({
        title: 'Template saved',
        description: `${template.name} has been saved to your templates.`,
      });
      setIsFormOpen(false);
    } else {
      toast({
        title: 'Error',
        description: 'Failed to save template. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleToggleFavorite = async (template: WorkoutTemplate) => {
    const updatedTemplate = {
      ...template,
      isFavorite: !template.isFavorite,
    };
    const success = await updateItem(updatedTemplate);
    if (success) {
      toast({
        title: updatedTemplate.isFavorite ? 'Added to favorites' : 'Removed from favorites',
        description: `${template.name} has been ${updatedTemplate.isFavorite ? 'added to' : 'removed from'} favorites.`,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Workout Templates</h1>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Template
        </Button>
      </div>

      {templates && templates.length > 0 ? (
        <TemplateList
          templates={templates}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No templates created yet.</p>
        </div>
      )}

      <TemplateForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleSaveTemplate}
      />
    </div>
  );
}