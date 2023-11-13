import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signin(dto: AuthDTO) {
    //Find user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    //If user not exist throw error
    if (!user) {
      throw new ForbiddenException(
        'Email ou senha incorretos',
      );
    }

    //Compare pasword
    const match = await argon.verify(
      user.hash,
      dto.hash,
    );

    //Throw error if not match
    if (!match) {
      throw new ForbiddenException(
        'Email ou senha incorretos',
      );
    }

    //Send back the user
    delete user.hash;
    return this.signToken(user.id, user.email);
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
          'Email já cadastrado',
        );
      }
      throw new Error('Internal server error');
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.sign(payload, {
      secret: secret,
    });

    return {
      token: token,
    };
  }
}
