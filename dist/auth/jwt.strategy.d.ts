import { Strategy } from 'passport-jwt';
import { UsersRepository } from './users.repository';
import { JwtPayLoad } from './jwt-payload.interface';
import { User } from './user.entity';
declare const JwtStrategy_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    validate(payload: JwtPayLoad): Promise<User>;
}
export {};
