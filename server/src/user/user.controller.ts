import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(parseInt(id));
  }

  @Put('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() data: any,
  ) {
    return this.userService.updateUser(
      parseInt(id),
      data,
    );
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(
      parseInt(id),
    );
  }
}
