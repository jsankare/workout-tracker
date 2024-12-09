import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dumbbell, History, Plus } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <Dumbbell className="mx-auto h-16 w-16 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Track Your Progress
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, intuitive workout tracking for strength training, cardio, and flexibility exercises.
            Log your progress and achieve your fitness goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="gap-2">
              <Link href="/workout/new">
                <Plus className="h-5 w-5" />
                Create Workout
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/history">
                <History className="h-5 w-5" />
                View History
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Exercise Library"
            description="Create and manage your custom exercise database with detailed information about each movement."
            icon={<Dumbbell className="h-6 w-6" />}
          />
          <FeatureCard
            title="Workout Templates"
            description="Save your favorite workouts as templates for quick access and consistent training."
            icon={<Plus className="h-6 w-6" />}
          />
          <FeatureCard
            title="Progress Tracking"
            description="Log your workouts and monitor your progress over time with detailed statistics."
            icon={<History className="h-6 w-6" />}
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-primary/10 p-2.5 text-primary">
          {icon}
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="mt-4 text-muted-foreground">{description}</p>
    </div>
  );
}