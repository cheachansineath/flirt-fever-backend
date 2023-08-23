import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class signInDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail()
    email: string

    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    password: string
}