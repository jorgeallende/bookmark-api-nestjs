import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BookmarkDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getBookmarks() {
    const bookmarks =
      await this.prisma.bookmark.findMany();

    if (!bookmarks) {
      throw new Error('Bookmarks not found');
    }

    return bookmarks;
  }

  async createBookmark(dto: BookmarkDTO) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: dto.userId,
        },
      });

    if (!user) {
      throw new ForbiddenException(
        'Usuário (field: userId) não encontrado',
      );
    }

    try {
      const bookmark =
        await this.prisma.bookmark.create({
          data: {
            title: dto.title,
            description: dto.description,
            link: dto.link,
            userId: dto.userId,
          },
        });

      return bookmark;
    } catch (error) {
      throw new Error('Error creating bookmark');
    }
  }
}
