import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber, IsEmpty } from "class-validator";

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

    bio: string

    preference: string

    interest: string[]
}