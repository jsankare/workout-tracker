"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useIndexedDB } from '@/lib/hooks/use-indexeddb';
import { WorkoutTemplate } from '@/lib/types/workout';
import { Exercise } from '@/lib/types/exercise';
import { WorkoutLogger } from '@/components/workout/workout-logger';
import { TemplateSelector } from '@/components/workout/template-selector';

export default function NewWorkoutPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<WorkoutTemplate | null>(null);
  const { data: templates } = useIndexedDB<WorkoutTemplate[]>('workoutTemplates');
  const { data: exercises } = useIndexedDB<Exercise[]>('exercises');

  if (!templates || !exercises) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {!selectedTemplate ? (
        <TemplateSelector
          templates={templates}
          onSelectTemplate={setSelectedTemplate}
          onStartEmpty={() => setSelectedTemplate({
            id: '',
            name: 'Quick Workout',
            exercises: [],
            notes: '',
            isFavorite: false,
          })}
        />
      ) : (
        <WorkoutLogger
          template={selectedTemplate}
          exercises={exercises}
          onCancel={() => setSelectedTemplate(null)}
          onComplete={() => router.push('/history')}
        />
      )}
    </div>
  );
}