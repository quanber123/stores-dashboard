import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthProvider';
type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user] = useAuth();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (user === null) {
  //     navigate('/login', { replace: true });
  //   }
  // }, [navigate, user]);
  if (user === null) {
    return <Navigate to={'/login'} replace />;
  }
  return children;
}
