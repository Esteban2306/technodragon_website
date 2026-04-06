import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controller/auth.controller";
import { JwtGuard } from "./guards/jwt-auth.guard";
import { AuthService } from "./service/auth.service";
import { JwtStrategy } from "./strategies/jwt.strategie";
import { Module } from "@nestjs/common";
import { PrismaModule } from "src/infrastructure/database/prisma/prisma.module";

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtGuard,
    
  ],
  exports: [AuthService, ],
})
export class AuthModule {}