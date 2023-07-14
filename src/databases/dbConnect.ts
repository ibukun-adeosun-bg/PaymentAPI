import path from "path";
import { ConnectionOptions } from "typeorm"
import dotenv from "dotenv"

dotenv.config();
export const dbConnection: ConnectionOptions = {
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, '../**/*.migration{.ts,.js}')],
    subscribers: [path.join(__dirname, '../**/*.subscriber{.ts,.js}')],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
}