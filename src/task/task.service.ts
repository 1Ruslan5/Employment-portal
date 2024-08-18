import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/createTask.dto";
import { TaskEntity } from "./task.entity";
import { UserRepository } from "@app/user/user.repository";
import { TaskRepository } from "./task.repository";
import { CompleteTaskDto } from "./dto/completeTask.dto";
import { ResTaskFinishTask } from "./types/resFinishTask";
import { ConfirmTaskDto } from "./dto/confirmTask.dro";


@Injectable()
export class TaskService {
  constructor(
    private userRepository: UserRepository,
    private taskRepository: TaskRepository,
  ) {}

  async createTask(
    customerId: number, 
    createTaskDto: CreateTaskDto
  ): Promise<TaskEntity> {
    const submitter = await this.userRepository.getUserByID(createTaskDto.submitterId);

    if (!submitter || submitter.role !== 'SUBMITTER') {
      throw new HttpException('submitterId is not a Submitter or does not exist', HttpStatus.FORBIDDEN);
    }

    const clearTask = this.prepareTaskCreateObject(createTaskDto);

    const task = await this.taskRepository.createTask(customerId, clearTask);
    if (!task) {
      throw new HttpException('Either repeat your request or repeat it later', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return task;
  }

  async completeTask(submitterId: number, completeTaskDto: CompleteTaskDto): Promise<ResTaskFinishTask> {
    const { id, completed } = completeTaskDto;

    const task = await this.taskRepository.findTaskById(id);
    if (task.completed) {
      throw new HttpException('Task has completed', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if (task.submitterId !== submitterId) {
      throw new HttpException('Submitter doesn`t take part to the task', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const taskCompleted = await this.taskRepository.updateCompletedTask(id, completed);

    if (!taskCompleted) {
      throw new HttpException('Either repeat your request or repeat it later', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return this.buildTaskFinishResponse(taskCompleted);
  }

  async confirmTask(customerId: number, confirmTaskDto: ConfirmTaskDto): Promise<ResTaskFinishTask> {
    const { id, confirmCustomer } = confirmTaskDto;

    const task = await this.taskRepository.findTaskById(id);
    if (task.confirmCustomer) {
      throw new HttpException('Task has confirmed', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if (task.customerId !== customerId) {
      throw new HttpException('Customer doesn`t take part to the task', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if (!task.completed) {
      throw new HttpException('Task doesn`t complete', HttpStatus.BAD_REQUEST);
    }

    const taskConfirmed = await this.taskRepository.updateConfirmCustomerTask(id, confirmCustomer);

    if (!taskConfirmed) {
      throw new HttpException('Either repeat your request or repeat it later', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return this.buildTaskFinishResponse(taskConfirmed);
  }

  async getSubmitterAllTasks(id: number): Promise<TaskEntity[]> {
    const tasks = await this.taskRepository.findAllTasks(undefined, id);
    if (tasks.length === 0) {
      throw new HttpException('No tasks found for the given submitter', HttpStatus.NOT_FOUND);
    }

    return tasks;
  }

  async getCustomerAllTasks(id: number): Promise<TaskEntity[]> {
    const tasks = await this.taskRepository.findAllTasks(id);
    if (tasks.length === 0) {
      throw new HttpException('No tasks found for the given customer', HttpStatus.NOT_FOUND);
    }

    return tasks;
  }

  private buildTaskFinishResponse(task: boolean): ResTaskFinishTask {
    return {
      result: task,
    };
  }

  private prepareTaskCreateObject(taskUpdateDto: CreateTaskDto): CreateTaskDto {
    const { 
      description, title , submitterId
     } = taskUpdateDto;

    return {
      description,
      title,
      submitterId,
    };
  }
}