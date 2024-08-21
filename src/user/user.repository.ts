import { PostgreSqlPrismaService } from '@app/prisma/prisma.postgres.service';
import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserRoles } from './types/userRoles.type';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(private prisma: PostgreSqlPrismaService) {}

  async createUser(userCreateDto: UserCreateDto, prisma = this.prisma): Promise<UserEntity | undefined> {
    const result = await prisma.$transaction(async (prisma) => {
      return await prisma.user.create({
        data: {
          ...userCreateDto,
          role: userCreateDto.role as UserRoles,
        },
      });
    });

    return result;
  }

  async getUserByEmail(email: string, prisma = this.prisma): Promise<UserEntity> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getUserByID(id: number, prisma = this.prisma): Promise<UserEntity> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updateUser(user: UserEntity, prisma = this.prisma): Promise<UserEntity> {
    return await prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
  }
}
