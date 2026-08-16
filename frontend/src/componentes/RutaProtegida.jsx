import { Navigate } from 'react-router-dom';
import { useAutenticacion } from '../contexto/ContextoAutenticacion.jsx';

export default function RutaProtegida({ children, roles }) {
  const { sesion } = useAutenticacion();
  if (!sesion) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(sesion.usuario.rol)) return <Navigate to="/" replace />;
  return children;
}
