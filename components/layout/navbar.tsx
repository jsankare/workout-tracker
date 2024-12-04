'use client';

import Link from 'next/link';
import { Shield, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold">WARRIOR</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 hidden md:block">
            <Link href="/exercises" className="text-sm font-medium transition-colors hover:text-primary">
              Exercises
            </Link>
            <Link href="/workouts" className="text-sm font-medium transition-colors hover:text-primary">
              Workouts
            </Link>
            <Link href="/stats" className="text-sm font-medium transition-colors hover:text-primary">
              Stats
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                <Link href="/exercises" className="text-sm font-medium transition-colors hover:text-primary">
                  Exercises
                </Link>
                <Link href="/workouts" className="text-sm font-medium transition-colors hover:text-primary">
                  Workouts
                </Link>
                <Link href="/stats" className="text-sm font-medium transition-colors hover:text-primary">
                  Stats
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}