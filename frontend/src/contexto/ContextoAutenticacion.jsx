import { createContext, useContext, useState } from 'react';
import { api } from '../servicios/api.js';

const Contexto = createContext(null);

export function ProveedorAutenticacion({ children }) {
  const [sesion, setSesion] = useState(() =>
    JSON.parse(localStorage.getItem('sga_sesion') || 'null'),
  );
  async function iniciarSesion(correo, contrasena) {
    const resultado = await api.iniciarSesion(correo, contrasena);
    localStorage.setItem('sga_sesion', JSON.stringify(resultado));
    setSesion(resultado);
  }
  async function cerrarSesion() {
    if (sesion?.token) await api.cerrarSesion().catch(() => {});
    localStorage.removeItem('sga_sesion');
    setSesion(null);
  }
  return (
    <Contexto.Provider value={{ sesion, iniciarSesion, cerrarSesion }}>
      {children}
    </Contexto.Provider>
  );
}

export function useAutenticacion() {
  return useContext(Contexto);
}
