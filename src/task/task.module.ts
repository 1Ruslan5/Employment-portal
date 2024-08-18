import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { PrismaModule } from "@app/prisma/prisma.module";
import { AuthModule } from "@app/auth/auth.module";
import { AuthCustomerGuard } from "@app/auth/guards/authCustomer.guard";
import { UserRepository } from "@app/user/user.repository";
import { TaskRepository } from "./task.repository";
import { TaskService } from "./task.service";
import { AuthSubmitterGuard } from "@app/auth/guards/authSubmitter.guard";


@Module({
  controllers: [TaskController,],
  providers: [
    TaskService, AuthCustomerGuard, AuthSubmitterGuard, UserRepository, TaskRepository,
  ],
  imports: [PrismaModule,],
})
export class TaskModule {}