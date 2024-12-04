import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/ui/PasswordInput';
import { useAuthStore } from '../store/authStore';
import { db } from '../lib/db';
import { hashPassword } from '../utils/crypto';
import { HealthMetricsDisplay } from '../components/profile/HealthMetrics';
import { calculateBMI, getBMICategory, calculateBMR, calculateIdealWeight } from '../utils/health';

export const Profile: React.FC = () => {
  const { user, setAuth } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    height: user?.height || '',
    weight: user?.weight || '',
    age: user?.age || '',
    gender: user?.gender || 'male',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const healthMetrics = formData.height && formData.weight && formData.age ? {
    bmi: calculateBMI(Number(formData.weight), Number(formData.height)),
    bmiCategory: getBMICategory(calculateBMI(Number(formData.weight), Number(formData.height))),
    bmr: calculateBMR(Number(formData.weight), Number(formData.height), Number(formData.age), formData.gender === 'male'),
    idealWeight: calculateIdealWeight(Number(formData.height), formData.gender === 'male'),
  } : null;

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
        height: Number(formData.height) || undefined,
        weight: Number(formData.weight) || undefined,
        age: Number(formData.age) || undefined,
        gender: formData.gender as 'male' | 'female',
        ...(formData.newPassword && {
          password: await hashPassword(formData.newPassword),
        }),
      };

      await database.put('users', updatedUser);
      setAuth({ 
        user: { 
          id: user!.id, 
          email: user!.email, 
          name: formData.name,
          height: Number(formData.height) || undefined,
          weight: Number(formData.weight) || undefined,
          age: Number(formData.age) || undefined,
          gender: formData.gender as 'male' | 'female',
        } 
      });
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

        <div className="max-w-2xl">
          {healthMetrics && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Health Metrics</h2>
              <HealthMetricsDisplay metrics={healthMetrics} />
            </div>
          )}

          <div className="bg-surface rounded-lg p-6">
            {!isEditing ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm text-gray-400">Name</h3>
                  <p className="text-white text-lg">{formData.name}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Email</h3>
                  <p className="text-white text-lg">{formData.email}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Height</h3>
                  <p className="text-white text-lg">{formData.height ? `${formData.height} cm` : 'Not set'}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Weight</h3>
                  <p className="text-white text-lg">{formData.weight ? `${formData.weight} kg` : 'Not set'}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Age</h3>
                  <p className="text-white text-lg">{formData.age || 'Not set'}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Gender</h3>
                  <p className="text-white text-lg">{formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}</p>
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

                <Input
                  label="Height (cm)"
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  min="0"
                  max="300"
                />

                <Input
                  label="Weight (kg)"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  min="0"
                  max="500"
                />

                <Input
                  label="Age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  min="0"
                  max="150"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg text-white"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <PasswordInput
                      label="New Password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    />
                    <PasswordInput
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
      </div>
    </DashboardLayout>
  );
};