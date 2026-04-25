import { Injectable, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private signAccessToken(userId: string, role: string) {
    return this.jwtService.sign(
      { sub: userId, role },
      { expiresIn: '1h' }
    );
  }

  private signRefreshToken(userId: string, role: string) {
    return this.jwtService.sign(
      { sub: userId, role },
      { expiresIn: '7d' }
    );
  }

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email }
    });

    if (exists) {
      throw new UnprocessableEntityException('Email already exists');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        name: dto.name
      }
    });

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email }
    });

    if (!user) throw new UnauthorizedException();

    const valid = await bcrypt.compare(dto.password, user.password);

    if (!valid) throw new UnauthorizedException();

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      accessToken: this.signAccessToken(user.id, user.role),
      refreshToken: this.signRefreshToken(user.id, user.role)
    };
  }

  async getMe(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);

      return this.signAccessToken(payload.sub, payload.role);
    } catch {
      throw new UnauthorizedException();
    }
  }
}