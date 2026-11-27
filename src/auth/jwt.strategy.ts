import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, @InjectRepository(User) private readonly users: Repository<User>) {
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), ignoreExpiration: false, secretOrKey: config.getOrThrow<string>('JWT_SECRET') });
  }

  async validate(payload: { sub: number }) {
    const user = await this.users.findOne({ where: { id: payload.sub }, select: ['id', 'name', 'email', 'role'] });
    if (!user) throw new UnauthorizedException('Account no longer exists');
    return user;
  }
}
