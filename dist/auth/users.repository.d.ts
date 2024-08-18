import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class UsersRepository {
    private dataSource;
    constructor(dataSource: DataSource);
    createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    findOne({ username }: {
        username: string;
    }): Promise<User | undefined>;
}
