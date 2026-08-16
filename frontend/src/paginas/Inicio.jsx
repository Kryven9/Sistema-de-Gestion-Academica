import { useAutenticacion } from '../contexto/ContextoAutenticacion.jsx';
import PanelAdministrador from './PanelAdministrador.jsx';
import PanelEstudiante from './PanelEstudiante.jsx';
import PanelProfesor from './PanelProfesor.jsx';

export default function Inicio() {
  const { sesion } = useAutenticacion();
  if (sesion.usuario.rol === 'ADMINISTRADOR') return <PanelAdministrador />;
  if (sesion.usuario.rol === 'PROFESOR') return <PanelProfesor />;
  return <PanelEstudiante />;
}
