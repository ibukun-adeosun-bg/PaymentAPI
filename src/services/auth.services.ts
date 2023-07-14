import { CreateUserDto, SignInUserDto } from "@/dto/users.dto";
import { UserEntity } from "@/entity/user.entity";
import HttpException from "@/exceptions/HttpException";
import { User } from "@/interfaces/user.interface";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt"
import { isEmpty } from "@/utils/util";
import jwt from "jsonwebtoken"
import { DataStoredInToken } from "@/interfaces/auth.interface";
import emailValidator from "email-validator"
import schema from "@/middleware/validation.middleware";

class AuthService {
    public users = UserEntity;

    //REGISTER A USER
    public async register(userData: CreateUserDto): Promise<User> {
        if (isEmpty(userData)) throw new HttpException(400, "You are not User Data")
        const userRepository = getRepository(this.users)
        const findUser: User = await userRepository.findOne({ where: { username: userData.username }})
        if (findUser) throw new HttpException(409, `The Username ${userData.username} already Exists`)

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userData.password, salt)

        const newData = {
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            isAdmin: userData.isAdmin
        }
        if (!schema.validate(userData.password)) {
            throw new HttpException(403, "Password must contain an uppercase letter, lowercase letter, no white spaces and at least 2 numbers")
        } else if (!emailValidator.validate(userData.email)) {
            throw new HttpException(403, "Invalid Email Address, Email Address should be in the form foo@bar.com")
        } else {
            const createUserData: User = await userRepository.save(newData)
            return createUserData
        }
    }

    //LOGIN AN EXISTING USER
    public async login(userData: SignInUserDto): Promise<{username: string, isAdmin: boolean, token: string}> {
        if (isEmpty(userData)) throw new HttpException(400, "You are not UserData")
        const userRepository = getRepository(this.users)
        const findUser: User = await userRepository.findOne({ where: { username: userData.username }})
        if (!findUser) throw new HttpException(404, "User not found")

        const isPasswordCorrect: boolean = await bcrypt.compare(userData.password, findUser.password)
        if (!isPasswordCorrect) throw new HttpException(403, "Username and Password don't match")

        const dataStoredInToken: DataStoredInToken = {
            username: findUser.username,
            email: findUser.email,
            password: findUser.password,
            isAdmin: findUser.isAdmin
        }
        const accessToken = jwt.sign(dataStoredInToken, process.env.JWT_SECRET, { expiresIn: "30d"})
        const userInfo = {
            username: findUser.username,
            isAdmin: findUser.isAdmin,
            token: accessToken
        }
        return userInfo
    }
}


export default AuthService