'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useExerciseStore } from '@/lib/hooks/use-exercise-store';
import { EXERCISE_TYPES, MUSCLE_GROUPS, SPECIFIC_MUSCLES } from '@/lib/constants';
import { useToast } from '@/components/ui/use-toast';

const exerciseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  muscleGroups: z.array(z.string()).min(1, 'Select at least one muscle group'),
  specificMuscles: z.array(z.string()).min(1, 'Select at least one specific muscle'),
  exerciseType: z.string().min(1, 'Exercise type is required'),
});

export function ExerciseDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { addExercise } = useExerciseStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof exerciseSchema>>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      name: '',
      description: '',
      muscleGroups: [],
      specificMuscles: [],
      exerciseType: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof exerciseSchema>) => {
    try {
      await addExercise(values);
      toast({
        title: 'Success',
        description: 'Exercise added successfully',
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add exercise',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Exercise</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Exercise name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Exercise description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exerciseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select exercise type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(EXERCISE_TYPES).map(([key, value]) => (
                        <SelectItem key={key} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Add Exercise</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}