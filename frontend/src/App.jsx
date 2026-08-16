import { Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio.jsx';
import Login from './paginas/Login.jsx';
import RutaProtegida from './componentes/RutaProtegida.jsx';
import RecuperarContrasena from './paginas/RecuperarContrasena.jsx';
import RestablecerContrasena from './paginas/RestablecerContrasena.jsx';
import Perfil from './paginas/Perfil.jsx';
import PanelAdministrador from './paginas/PanelAdministrador.jsx';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RutaProtegida>
            <Inicio />
          </RutaProtegida>
        }
      />
      <Route
        path="/usuarios"
        element={
          <RutaProtegida roles={['ADMINISTRADOR']}>
            <PanelAdministrador />
          </RutaProtegida>
        }
      />
      <Route
        path="/perfil"
        element={
          <RutaProtegida>
            <Perfil />
          </RutaProtegida>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
      <Route path="/restablecer-contrasena" element={<RestablecerContrasena />} />
    </Routes>
  );
}

export default App;
