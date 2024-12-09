"use client";

import { WorkoutTemplate } from '@/lib/types/workout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, Star, Clock } from 'lucide-react';
import { calculateEstimatedDuration } from '@/lib/utils/workout';

interface TemplateSelectorProps {
  templates: WorkoutTemplate[];
  onSelectTemplate: (template: WorkoutTemplate) => void;
  onStartEmpty: () => void;
}

export function TemplateSelector({ templates, onSelectTemplate, onStartEmpty }: TemplateSelectorProps) {
  const favoriteTemplates = templates.filter(t => t.isFavorite);
  const recentTemplates = templates
    .filter(t => !t.isFavorite)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Start Workout</h1>
        <Button onClick={onStartEmpty} className="gap-2">
          <Plus className="h-4 w-4" />
          Quick Workout
        </Button>
      </div>

      {favoriteTemplates.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Favorite Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteTemplates.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={() => onSelectTemplate(template)}
              />
            ))}
          </div>
        </div>
      )}

      {recentTemplates.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentTemplates.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={() => onSelectTemplate(template)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TemplateCard({ template, onSelect }: { template: WorkoutTemplate; onSelect: () => void }) {
  return (
    <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={onSelect}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {template.name}
          {template.isFavorite && <Star className="h-4 w-4 text-yellow-500" />}
        </CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {calculateEstimatedDuration(template.exercises)} min
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {template.exercises.length} exercises
        </p>
      </CardContent>
    </Card>
  );
}