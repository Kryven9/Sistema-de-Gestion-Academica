import bcrypt from 'bcrypt';
import IHashContrasenas from '../../application/ports/IHashContrasenas.js';

export default class HashContrasenas extends IHashContrasenas {
  constructor(saltos = process.env.BCRYPT_SALT_ROUNDS || 10) {
    super();
    this.saltos = Number(saltos);
  }
  generar(contrasena) {
    return bcrypt.hash(contrasena, this.saltos);
  }
  comparar(contrasena, hash) {
    return bcrypt.compare(contrasena, hash);
  }
}
