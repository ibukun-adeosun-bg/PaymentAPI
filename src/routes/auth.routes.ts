import AuthController from "@/controllers/auth.controller";
import Routes from "@/interfaces/routes.interface";
import { Router } from "express";

class AuthRoutes implements Routes {
    public path = "/api/v1/auth/"
    public router = Router()
    public authController = new AuthController()

    constructor() {
        this.initialiseRoutes()
    }

    private initialiseRoutes() {
        this.router.post(`${this.path}register`, this.authController.register)
        this.router.post(`${this.path}login`, this.authController.login)
    }
}

export default AuthRoutes