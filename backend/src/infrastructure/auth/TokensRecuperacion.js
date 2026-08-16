import { createHash, randomBytes } from 'node:crypto';
import ITokensRecuperacion from '../../application/ports/ITokensRecuperacion.js';

export default class TokensRecuperacion extends ITokensRecuperacion {
  generar() {
    const token = randomBytes(32).toString('hex');
    return { token, hash: this.resumir(token) };
  }

  resumir(token) {
    return createHash('sha256')
      .update(token || '')
      .digest('hex');
  }
}
