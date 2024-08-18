"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_status_enum_1 = require("./task-status.enum");
const task_entity_1 = require("./task.entity");
const common_2 = require("@nestjs/common");
let TasksRepository = class TasksRepository {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_2.Logger('TasksRepository');
    }
    async getTasks(filterDto, user) {
        const { status, search } = filterDto;
        const query = this.repository.createQueryBuilder('task');
        query.where({ user });
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        try {
            const tasks = await query.getMany();
            return tasks;
        }
        catch (error) {
            this.logger.error(`Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
    async createTask(createTaskDto, user) {
        const { title, description } = createTaskDto;
        const task = this.repository.create({
            title,
            description,
            status: task_status_enum_1.TaskStatus.OPEN,
            user,
        });
        await this.repository.save(task);
        return task;
    }
    async findOne(options) {
        return this.repository.findOne(options);
    }
    async save(task) {
        return this.repository.save(task);
    }
    async delete(options) {
        return this.repository.delete(options);
    }
};
exports.TasksRepository = TasksRepository;
exports.TasksRepository = TasksRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksRepository);
//# sourceMappingURL=tasks.repository.js.map