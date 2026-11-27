import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register') register(@Body() body: RegisterDto) { return this.auth.register(body); }
  @Post('login') login(@Body() body: LoginDto) { return this.auth.login(body); }

  @UseGuards(AuthGuard('jwt'))
  @Get('me') me(@Req() request: any) {
    const { id, email, role } = request.user;
    return { id, email, role };
  }
}
