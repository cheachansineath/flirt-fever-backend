import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const databaseConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'bootcamp',
    password: 'bootcamp',
    database: 'flirtfever',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true
}

export default databaseConfig;