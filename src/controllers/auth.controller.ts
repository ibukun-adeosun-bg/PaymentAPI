import { CreateUserDto, SignInUserDto } from "@/dto/users.dto";
import { User } from "@/interfaces/user.interface";
import AuthService from "@/services/auth.services";
import { Request, Response, NextFunction } from "express";

class AuthController {
    public authService = new AuthService()

    public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: CreateUserDto = req.body
            const registerData: User = await this.authService.register(userData)
            res.status(200).json({
                success: true,
                status: "OK",
                message: "User has been successfully registered",
                data: registerData
            })
        } catch (error) {
            next(error)
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: SignInUserDto = req.body
            const { username, isAdmin, token } = await this.authService.login(userData)
            res.status(200).json({
                success: true,
                status: "OK",
                message: "You are now successfully logged in",
                username: username,
                isAdmin: isAdmin,
                accessToken: token
            })
        } catch (error) {
            next(error)
        }
    }
}


export default AuthController;