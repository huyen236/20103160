import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor() { }
  async login(body: any) {
    const { email, password } = body
  }
}
