import React from 'react';
import { Copy, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { Workout } from '../../types/workout';

interface TemplateWorkoutsProps {
  templates: Workout[];
  onUseTemplate: (template: Workout) => void;
}

export const TemplateWorkouts: React.FC<TemplateWorkoutsProps> = ({
  templates,
  onUseTemplate,
}) => {
  return (
    <div className="bg-surface rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Template Workouts</h2>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-background p-4 rounded-lg border border-surface-light"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-white">{template.name}</h3>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onUseTemplate(template)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Use Template
              </Button>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Duration: {template.duration} minutes
            </p>
            <div className="space-y-2">
              {template.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-300 flex items-center justify-between"
                >
                  <span>{exercise.name}</span>
                  <span className="text-gray-400">
                    {exercise.sets} × {exercise.reps || exercise.duration}
                    {exercise.reps ? ' reps' : 's'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};