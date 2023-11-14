import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signin(dto: AuthDTO): Promise<{
        token: string;
    }>;
    signup(dto: AuthDTO): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        hash: string;
        firstName: string;
        lastName: string;
    }>;
    signToken(userId: number, email: string): Promise<{
        token: string;
    }>;
}
