import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { HashUtil } from '../utils/hash.util';
import { APP_CONFIG } from '../../config';
// import { INTEGRATORS_TYPE } from '../constants/common.constant';

@Injectable()
export class ChecktokenMerchantMiddleware implements NestMiddleware {
  constructor(@Inject(HashUtil) private hashUtil: HashUtil) {}

  use(req: Request, res: Response, next: any) {
    let token = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).send({
        success: false,
        message: 'Token không chính xác hoặc đã hết hạn',
      });
    }
    token = token.slice(7, token.length).trimLeft();
    this.hashUtil
      .verifyToken(token.toString(), APP_CONFIG.fv_token_secret_key)
      .then((data) => {
        // if (data.type !== INTEGRATORS_TYPE.CONSUMER) {
        //   throw 'Tài khoản xác thực không hợp lệ';
        // }
        req['user'] = data;
        next();
      })
      .catch((e) => {
        return res.status(401).send({
          success: false,
          message: 'Token không chính xác hoặc đã hết hạn',
        });
      });
  }
}
