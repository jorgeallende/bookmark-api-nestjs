import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { JwtGuard } from './guard';
import { GetUser } from './decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDTO) {
    console.log({
      dto,
    });
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDTO) {
    return this.authService.signin(dto);
  }

  @UseGuards(JwtGuard)
  @Get('test-token')
  testToken(@GetUser() user: User) {
    return user;
  }
}
