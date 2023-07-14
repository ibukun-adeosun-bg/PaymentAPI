import { CreateUserDto } from "@/dto/users.dto"
import { UserEntity } from "@/entity/user.entity"
import HttpException from "@/exceptions/HttpException"
import { User } from "@/interfaces/user.interface"
import bcrypt from "bcrypt"
import { getRepository } from "typeorm"

class UserService {
    public users = UserEntity

    //GET ALL USERS
    public async findAllUsers(): Promise<User[]> {
        const userRepository = getRepository(this.users)
        const users: User[] = await userRepository.find()
        return users
    }

    //GET A PARTICULAR USER
    public async findAParticularUser(userId: string): Promise<User> {
        const userRepository = getRepository(this.users)
        const user: User = await userRepository.findOne({ where: { userId: userId }})
        return user
    }

    //UPDATE USER INFORMATION USER
    public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
        const userRepository = getRepository(this.users)
        const findUser: User = await userRepository.findOne({ where: { userId: userId }})
        if (!findUser) throw new HttpException(404, "This User doesn't exist")

        if (userData.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(userData.password, salt)
            await userRepository.update(userId, { password: hashedPassword })
        } else {
            await userRepository.update(userId, { ...userData });
        }

        const updatedUser: User = await userRepository.findOne({ where: { userId: userId }})
        return updatedUser
    }

    //DELETE USER INFORMATION
    public async deleteUser(userId: string): Promise<User> {
        const userRepository = getRepository(this.users)
        const findUser: User = await userRepository.findOne({ where: { userId: userId }})
        if (!findUser) throw new HttpException(404, "This user does not exist")

        await userRepository.delete(userId)
        return findUser
    }
}


export default UserService