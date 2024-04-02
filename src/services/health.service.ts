import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor() {}
  async ping() {
    try {
      const resData = {
        status: 'success',
        timestamp: Date.now(),
      };
      return resData;
    } catch (error) {
      throw error;
    }
  }
}
