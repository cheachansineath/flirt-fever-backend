import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class OtpDto {
    @IsNotEmpty({ message: 'Username is required' })
    @IsEmail()
    email: string

    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    @MinLength(6, { message: "6 pin code required"})
    @MaxLength(6, { message: "6 pin code required"})
    pin: string
}