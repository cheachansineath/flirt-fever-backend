import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class signUpDto {
    @IsNotEmpty({ message: 'Username is required' })
    @IsString({ message: 'Username should be a string' })
    username: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password should be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail()
    email: string
}