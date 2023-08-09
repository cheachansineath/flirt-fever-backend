import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'bootcamp',
    password: 'bootcamp',
    database: 'flirtfever',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    migrations: [
        'dist/db/migrations/*.js'
    ]
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;