import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { User } from '@prisma/client';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDTO): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        hash: string;
        firstName: string;
        lastName: string;
    }>;
    signin(dto: AuthDTO): Promise<{
        token: string;
    }>;
    testToken(user: User): {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        hash: string;
        firstName: string;
        lastName: string;
    };
}
