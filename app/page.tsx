'use client';

import { useEffect } from 'react';
import { initDB } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Shield, Dumbbell, History, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground bg-[url('/tribal-pattern.svg')] bg-repeat">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-b from-background/95 to-background/70">
        <div className="text-center space-y-6 p-4">
          <Shield className="w-16 h-16 mx-auto text-primary animate-pulse" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            WARRIOR WORKOUTS
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            Train with the spirit of Mali warriors. Build strength, endurance, and
            discipline through ancient wisdom and modern science.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/workout/new">
                <Dumbbell className="mr-2 h-5 w-5" />
                Start Workout
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Link href="/exercises">View Exercises</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <History className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Recent Workouts</h3>
          <p className="text-muted-foreground">Loading recent activity...</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border">
          <TrendingUp className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Progress Stats</h3>
          <p className="text-muted-foreground">Tracking your warrior journey...</p>
        </div>

        <div className="md:col-span-2 lg:col-span-1 bg-card p-6 rounded-lg border border-border">
          <Dumbbell className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button asChild variant="outline">
              <Link href="/exercises">Exercise Library</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/workout/new">New Workout</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}