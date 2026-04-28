import type { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import type { JwtPayload } from '../types/jwt.types';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    me(user: JwtPayload): Promise<{
        name: string | null;
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
    } | null>;
    refresh(req: Request, res: Response): Promise<{
        ok: boolean;
    }>;
    logout(res: Response): {
        ok: boolean;
    };
}
