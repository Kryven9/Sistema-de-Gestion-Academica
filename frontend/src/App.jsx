import { Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
    </Routes>
  );
}

export default App;
