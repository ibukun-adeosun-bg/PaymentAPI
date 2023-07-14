import { IsString, IsEmail, IsBoolean } from "class-validator"

export class CreateUserDto {
    @IsString()
    public username: string

    @IsEmail()
    public email: string

    @IsString()
    public password: string

    @IsBoolean()
    public isAdmin: boolean

}

export class SignInUserDto {
    @IsString()
    public username: string

    @IsString()
    public password: string
}