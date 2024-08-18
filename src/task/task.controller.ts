import { Body, Controller, Get, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { TaskService } from "./task.service";
import { AuthCustomerGuard } from "@app/auth/guards/authCustomer.guard";
import { TaskEntity } from "./task.entity";
import { CreateTaskDto } from "./dto/createTask.dto";
import { ExpressAuthInterface } from "@app/types/expressAuth.interface";
import { User } from "@app/decorators/user.decorator";
import { AuthSubmitterGuard } from "@app/auth/guards/authSubmitter.guard";
import { CompleteTaskDto } from "./dto/completeTask.dto";
import { ResTaskFinishTask } from "./types/resFinishTask";
import { ConfirmTaskDto } from "./dto/confirmTask.dro";


@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthCustomerGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async createTask(
    @User('id') id: number, 
    @Body('task') createTaskDto: CreateTaskDto
  ): Promise<TaskEntity> {
    return this.taskService.createTask(id, createTaskDto);
  }

  @UseGuards(AuthSubmitterGuard)
  @UsePipes(new ValidationPipe())
  @Patch('complete')
  async completeTask(
    @User('id') id: number,
    @Body('task') completeTaskDto: CompleteTaskDto,
  ): Promise<ResTaskFinishTask> {
    return this.taskService.completeTask(id, completeTaskDto);
  }

  @UseGuards(AuthCustomerGuard)
  @UsePipes(new ValidationPipe())
  @Patch('confirm')
  async confirmTask(@User('id') id: number, @Body('task') confirmTaskDto: ConfirmTaskDto): Promise<ResTaskFinishTask> {
    return this.taskService.confirmTask(id, confirmTaskDto);
  }

  @UseGuards(AuthSubmitterGuard)
  @UsePipes(new ValidationPipe())
  @Get('submitter')
  async getSubmitterTasks(@User('id') id: number): Promise<TaskEntity[]> {
    return this.taskService.getSubmitterAllTasks(id);
  }

  @UseGuards(AuthCustomerGuard)
  @UsePipes(new ValidationPipe())
  @Get('customer')
  async getCustomerTasks(@User('id') id: number): Promise<TaskEntity[]> {
    return this.taskService.getCustomerAllTasks(id);
  }
}