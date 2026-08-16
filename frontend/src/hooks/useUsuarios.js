import { useCallback, useEffect, useState } from 'react';
import { api } from '../servicios/api.js';

export default function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarUsuarios = useCallback(async () => {
    setCargando(true);
    setError('');
    try {
      const respuesta = await api.listarUsuarios();
      setUsuarios(respuesta.usuarios || []);
    } catch (exception) {
      setError(exception.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarUsuarios();
  }, [cargarUsuarios]);

  const desactivarUsuario = useCallback(async (usuario) => {
    if (!window.confirm(`¿Desactivar a ${usuario.nombre}?`)) return false;
    try {
      await api.desactivarUsuario(usuario.id);
      setUsuarios((actuales) =>
        actuales.map((item) => (item.id === usuario.id ? { ...item, activo: false } : item)),
      );
      return true;
    } catch (exception) {
      setError(exception.message);
      return false;
    }
  }, []);

  return { usuarios, cargando, error, cargarUsuarios, desactivarUsuario };
}
