import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { HealthService } from '../services';
import { ERROR_QRCODE } from '../constants';

@Injectable()
export class HealthMiddleware implements NestMiddleware {
  constructor(private healthService: HealthService) {}

  async use(req: Request, res: any, next: (error?: any) => void) {
    const baseUrl = req.baseUrl;
    const isPingUrl = /\/ping$/.test(baseUrl);
    if (!isPingUrl) {
      const isOk = await this.healthService.ping();

      if (!isOk) {
        throw ERROR_QRCODE.SERVICE_UNAVAILABLE;
      }
    }

    next();
  }
}
