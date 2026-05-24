import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './users.model';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserModel)
        private readonly userModel: Repository<UserModel>
    ) {}
    async findAll() {
        return await this.userModel.find();
    }
}
