module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'typeorm1',
    synchronize: false,
    logging: false,
    entities: [
        process.env.NODE_ENV == 'PROD' ? 'dist/models/*.js' : 'src/models/*.ts',
    ],
    migrations: [
        process.env.NODE_ENV == 'PROD'
            ? 'src/mirations/**/*.ts'
            : 'dist/migrations/*.js',
    ],
    migrationsTableName: 'type_migrations',
    subscribers: [
        process.env.NODE_ENV == 'PROD'
            ? 'src/subscribers/*.js'
            : 'src/subscriber/*.ts',
    ],
    cli: {
        entitiesDir: 'src/models',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
};
