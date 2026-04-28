import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    private signAccessToken;
    private signRefreshToken;
    register(dto: RegisterDto): Promise<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import(".prisma/client").$Enums.UserRole;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    getMe(userId: string): Promise<{
        name: string | null;
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
    } | null>;
    refresh(refreshToken: string): Promise<string>;
}
