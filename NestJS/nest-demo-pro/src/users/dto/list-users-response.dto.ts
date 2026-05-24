import { IsString, IsDate } from "class-validator";

export class ListUsersResponseDTO {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    avatarUrl?: string;

    @IsString()
    bio?: string;

    @IsString()
    location?: string;

    @IsString()
    website?: string;

    @IsString()
    role: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}