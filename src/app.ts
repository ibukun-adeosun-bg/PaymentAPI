import compression from "compression"
import express, { Application } from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import Routes from "./interfaces/routes.interface"
import errorMiddleware from "./middleware/error.middleware"
import { createConnection } from "typeorm"
import { dbConnection } from "./databases/dbConnect"

class App {
    public express: Application
    public port: number
    constructor(routes: Routes[], port: number) {
        this.express = express()
        this.port = port
        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseRoutes(routes);
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware(): void {
        this.express.use(compression())
        this.express.use(helmet())
        this.express.use(morgan("dev"))
        this.express.use(cors())
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: true }))
    }

    private initialiseRoutes(routes: Routes[]): void {
        routes.forEach((route: Routes) => {
            this.express.use("/", route.router)
        })
    }

    private initialiseErrorHandling(): void {
        this.express.use(errorMiddleware)
    }

    private async initialiseDatabaseConnection() {
        try {
            const connection = await createConnection(dbConnection)
            await connection.runMigrations()
            console.log("Database is Up");
        } catch (err) {
            console.error(err.message)
        }
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`Backend Server is currently running on port ${this.port}`);
        })
    }
}

export default App;