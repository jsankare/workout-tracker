import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/ui/Button';
import { verifyEmail } from '../lib/auth';

export const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    const verify = async () => {
      try {
        if (token) {
          await verifyEmail(token);
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (err) {
        setStatus('error');
      }
    };

    verify();
  }, [token]);

  return (
    <AuthLayout title="Email Verification">
      <div className="text-center">
        {status === 'verifying' && (
          <p className="text-gray-300">Verifying your email...</p>
        )}
        {status === 'success' && (
          <>
            <p className="text-green-500 mb-4">Your email has been verified successfully!</p>
            <Button onClick={() => navigate('/login')}>
              Proceed to Login
            </Button>
          </>
        )}
        {status === 'error' && (
          <>
            <p className="text-red-500 mb-4">Failed to verify your email. The link may be invalid or expired.</p>
            <Button onClick={() => navigate('/login')}>
              Back to Login
            </Button>
          </>
        )}
      </div>
    </AuthLayout>
  );
};