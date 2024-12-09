"use client";

import { DataManagement } from '@/components/settings/data-management';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="max-w-2xl mx-auto">
        <DataManagement />
      </div>
    </div>
  );
}