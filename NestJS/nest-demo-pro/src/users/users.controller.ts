import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ListUsersResponseDTO } from './dto/list-users-response.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Get()
    async findAll() : Promise<ListUsersResponseDTO[]> {
        return this.usersService.findAll();
    }
}
