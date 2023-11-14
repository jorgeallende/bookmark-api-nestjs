import { BookmarkDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class BookmarkService {
    private prisma;
    constructor(prisma: PrismaService);
    getBookmarks(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        link: string;
        userId: number;
    }[]>;
    createBookmark(dto: BookmarkDTO): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        link: string;
        userId: number;
    }>;
}
