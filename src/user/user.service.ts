import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCreateDto } from './dto/userCreate.dto';
import { AuthService } from '@app/auth/auth.service';
import { ResUserWithToken } from './types/resUserWithToken';
import { UserType } from './types/user.type';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserEntity } from './user.entity';
import { ResUser } from './types/resUser';
import { UserUpdateDto } from './dto/userUpdate.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService,
  ) {}

  async loginUser(loginUserDto: LoginUserDto): Promise<ResUserWithToken> {
    const user = await this.checkLoginData(loginUserDto.email, loginUserDto.password);
    return this.buildUserResponseWithToken(user);
  }

  async createUser(userCreateDto: UserCreateDto): Promise<ResUserWithToken> {
    const userClean = this.prepareUserCreateObject(userCreateDto);

    const { email } = userCreateDto;

    const userByEmail = await this.userRepository.getUserByEmail(email);

    if (userByEmail) {
      throw new HttpException('Email are taken', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const passwordHashed = await this.authService.hashPassword(userClean.password);

    const data = {
      ...userCreateDto,
      password: passwordHashed,
    };

    const user = await this.userRepository.createUser(data);
    if (!user) {
      throw new HttpException('Either repeat your request or repeat it later', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return this.buildUserResponseWithToken(user);
  }

  async updateUser(userId: number, updateUserDto: UserUpdateDto): Promise<ResUser> {
    if (updateUserDto.email) {
      const userByEmail = await this.userRepository.getUserByEmail(updateUserDto.email);
      if (userByEmail) {
        throw new HttpException('Email are taken', HttpStatus.UNPROCESSABLE_ENTITY);
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.authService.hashPassword(updateUserDto.password);
    }

    const user = await this.userRepository.getUserByID(userId);
    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.updateUser(user);
    return this.buildUserResponse(updatedUser);
  }

  async getUser(userId: number): Promise<ResUser> {
    const user = await this.userRepository.getUserByID(userId);
    return this.buildUserResponse(user);
  }

  private async checkLoginData(email: string, password: string): Promise<UserEntity> {
    try {
      const userByEmail = await this.userRepository.getUserByEmail(email);
      if (!userByEmail) {
        throw Error;
      }

      const validPassword = await this.authService.validatePassword(password, userByEmail.password);
      if (!validPassword) {
        throw Error;
      }

      return userByEmail;
    } catch (error) {
      throw new HttpException('Email or password is incorrect', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getUserById(id: number): Promise<ResUser> {
    const user = await this.userRepository.getUserByID(id);

    return this.buildUserResponse(user);
  }

  private prepareUserCreateObject(userUpdateDto: UserCreateDto): UserCreateDto {
    const { email, password, role } = userUpdateDto;

    return { email, password, role };
  }

  private buildUserResponse(user: UserType): ResUser {
    const { id, email, role } = user;

    return {
      user: {
        id,
        email,
        role,
      },
    };
  }

  private buildUserResponseWithToken(user: UserType): ResUserWithToken {
    const { id, email, role } = user;

    const token = this.authService.createJwtToken(id, role);

    return {
      user: {
        id,
        email,
        role,
        token,
      },
    };
  }
}
