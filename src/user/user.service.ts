import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    const users =
      await this.prisma.user.findMany();

    if (!users) {
      throw new NotFoundException();
    }

    return users;
  }

  async getUser(id: number) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

    if (!user) {
      throw new NotFoundException({
        message: `Usuário não encontrado`,
        status: 404,
      });
    }

    return user;
  }

  async updateUser(id: number, data: any) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });

    if (!user) {
      throw new NotFoundException({
        message: `Usuário não encontrado`,
        status: 404,
      });
    }

    return user;
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException({
        message: `Usuário não encontrado`,
        status: 404,
      });
    }

    return user;
  }
}
