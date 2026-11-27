import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(input: RegisterDto) {
    const email = input.email.toLowerCase();
    if (await this.users.findOneBy({ email })) throw new ConflictException('Email is already registered');
    const user = this.users.create({ name: input.name, email, passwordHash: await bcrypt.hash(input.password, 12), role: 'customer' });
    await this.users.save(user);
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }

  async login(input: LoginDto) {
    const user = await this.users.createQueryBuilder('user').addSelect('user.passwordHash').where('user.email = :email', { email: input.email.toLowerCase() }).getOne();
    if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) throw new UnauthorizedException('Invalid email or password');
    const accessToken = await this.jwt.signAsync({ sub: user.id, email: user.email, role: user.role });
    return { accessToken, tokenType: 'Bearer', expiresIn: this.config.get('JWT_EXPIRES_IN', '1d'), user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  }
}
