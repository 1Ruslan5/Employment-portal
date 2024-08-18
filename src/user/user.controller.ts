import { Body, Controller, Post, UsePipes, ValidationPipe, UseGuards, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/userCreate.dto';
import { ResUserWithToken } from './types/resUserWithToken';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { ResUser } from './types/resUser';
import { User } from '@app/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async createUser(@Body('user') createUserDto: UserCreateDto): Promise<ResUserWithToken> {
    return this.userService.createUser(createUserDto);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async loginUser(@Body('user') loginUserDto: LoginUserDto): Promise<ResUserWithToken> {
    return this.userService.loginUser(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch()
  async updateUser(@User('id') id: number, @Body('user') updateUser: UserUpdateDto): Promise<ResUser> {
    return this.userService.updateUser(id, updateUser);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getCurrentUser(@User('id') id: number): Promise<ResUser> {
    return this.userService.getUser(id);
  }
}
