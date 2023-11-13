import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signin() {
    return {
      message: 'Login success',
    };
  }

  async signup(dto: AuthDTO) {
    //Generate new password
    const hash = await argon.hash(dto.hash);

    try {
      //Save the new user
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      delete user.hash;

      //Return the saved user
      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        throw new ForbiddenException(
          'Email already exists',
        );
      }
      throw new Error('Internal server error');
    }
  }
}
