import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {
    return {
      message: 'Login success',
    };
  }

  signup() {
    return {
      message: 'Signup success',
    };
  }
}
