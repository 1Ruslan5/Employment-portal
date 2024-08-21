import { PostgreSqlPrismaService } from "@app/prisma/prisma.postgres.service";
import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/createTask.dto";
import { TaskEntity } from "./task.entity";


@Injectable()
export class TaskRepository {
  constructor(private prisma: PostgreSqlPrismaService) {}

  async createTask(customerId: number, taskCreateDto: CreateTaskDto, prisma = this.prisma): Promise<TaskEntity> {
    return await prisma.task.create({
      data: {
        ...taskCreateDto,
        customerId,
      },
    });
  }

  async findTaskById(id: number, prisma = this.prisma): Promise<TaskEntity> {
    return await prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async updateCompletedTask(id: number, completed: boolean, prisma = this.prisma): Promise<boolean> {
    try {
      await prisma.task.update({
        where: {
          id,
        },
        data: {
          completed,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateConfirmCustomerTask(
    id: number, 
    confirmCustomer: boolean, 
    prisma = this.prisma
  ): Promise<boolean> {
    try {
      await prisma.task.update({
        where: {
          id,
        },
        data: {
          confirmCustomer,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async findAllTasks(
    customerId?: number,
    submitterId?: number,
    prisma = this.prisma
  ) : Promise<TaskEntity[]> {
    return prisma.task.findMany({
      where: {
        ...(customerId !== undefined && { customerId }),
        ...(submitterId !== undefined && { submitterId }),
      },
    });
  };
}

