import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';

export default class TokensJwt {
  constructor({
    secreto = process.env.JWT_SECRET,
    expiracion = process.env.JWT_EXPIRATION || '8h',
  } = {}) {
    if (!secreto && process.env.NODE_DEV === 'production')
      throw new Error('JWT_SECRET no está configurado');
    this.secreto = secreto || 'secreto-solo-para-pruebas';
    this.expiracionConfigurada = expiracion;
  }
  firmar(datos) {
    return jwt.sign(datos, this.secreto, {
      expiresIn: this.expiracionConfigurada,
      jwtid: randomUUID(),
    });
  }
  verificar(token) {
    return jwt.verify(token, this.secreto);
  }
  idSesion(token) {
    return this.verificar(token).jti;
  }
  expiracion(token) {
    return new Date(this.verificar(token).exp * 1000);
  }
}
