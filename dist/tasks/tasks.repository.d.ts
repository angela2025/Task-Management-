import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
export declare class TasksRepository {
    private readonly repository;
    private logger;
    constructor(repository: Repository<Task>);
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    findOne(options: any): Promise<Task | undefined>;
    save(task: Task): Promise<Task>;
    delete(options: any): Promise<any>;
}
