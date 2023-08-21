import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  create(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }
    return task;
  }

  updateStatus(id: string, status: TaskStatus): Task {
    const task = this.findOne(id);

    task.status = status;

    return task;
  }

  remove(id: string): void {
    this.findOne(id);

    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
