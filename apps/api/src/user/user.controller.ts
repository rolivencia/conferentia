// Core
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

// Models
import { User } from '@conferentia/models';

// Services
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('getByEmail/:email')
  getByEmail(@Param() params): Promise<User> {
    const email: string = params.email;
    return this.userService.getByEmail(email);
  }

  @Get('getById/:id')
  getById(@Param() params): Promise<User> {
    const id: string = params.id;
    return this.userService.getById(id);
  }

  @Post()
  create(@Body() body: Partial<User>): Promise<User> {
    return null;
  }

  @Put()
  update(@Body() body: User): Promise<User> {
    return null;
  }
}
