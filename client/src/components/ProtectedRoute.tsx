import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { roles } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (roles === null) {
        navigate('/login');
        return;
      }

      if (!roles.includes('admin')) {
        throw new Error();
      }
    },
    [roles, navigate]
  );

  return <>{children}</>;
}
