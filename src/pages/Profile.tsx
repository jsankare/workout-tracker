import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';
import { db } from '../lib/db';
import { hashPassword } from '../utils/crypto';

export const Profile: React.FC = () => {
  const { user, setAuth } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const database = await db;
      
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('New passwords do not match');
        }
        if (formData.newPassword.length < 8) {
          throw new Error('Password must be at least 8 characters long');
        }
      }

      const updatedUser = {
        ...user,
        name: formData.name,
        ...(formData.newPassword && {
          password: await hashPassword(formData.newPassword),
        }),
      };

      await database.put('users', updatedUser);
      setAuth({ user: { id: user!.id, email: user!.email, name: formData.name } });
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white mb-8">Profile Settings</h1>

        <div className="max-w-2xl bg-surface rounded-lg p-6">
          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm text-gray-400">Name</h3>
                <p className="text-white text-lg">{user?.name}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400">Email</h3>
                <p className="text-white text-lg">{user?.email}</p>
              </div>
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
                <div className="space-y-4">
                  <Input
                    type="password"
                    label="New Password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  />
                  <Input
                    type="password"
                    label="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <div className="flex justify-end gap-4">
                <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};