import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";

function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const errorStatus = error.status || 500
    const errorMessage = error.message || "something went wrong"
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: error.stack
    })
}

export default errorMiddleware