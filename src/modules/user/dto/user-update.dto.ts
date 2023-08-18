import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber } from "class-validator";

export class UserUpdateDto {
    @IsNotEmpty()
    @IsString()
    gender: string

    @IsNotEmpty()
    height: number

    @IsNotEmpty()
    weight: number

    @IsNotEmpty()
    age: number

    @IsNotEmpty()
    @IsString()
    location: string

    @IsString()
    bio: string
}