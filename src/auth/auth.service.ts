import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  // UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const emailExists = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });
    if (emailExists) {
      throw new BadRequestException(`${registerDto.email} already exists`);
    }

    const mobileExists = await this.prisma.user.findUnique({
      where: { mobile: registerDto.mobile },
    });
    if (mobileExists) {
      throw new BadRequestException(`${registerDto.mobile} already exists`);
    }

    registerDto.password = await hash(registerDto.password, 10);

    const user = await this.prisma.user.create({ data: registerDto });

    const token = await this.jwtService.signAsync({
      user_id: user.id,
    });

    return { token };
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: loginDto.user }, { mobile: loginDto.user }],
      },
    });
    if (!user) {
      throw new NotFoundException(`user ${loginDto.user} not found`);
    }
    if (!(await compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync({
      userId: user.id,
    });
    return { token };
  }
}
