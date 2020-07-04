module.exports = {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'test',
    password: process.env.DB_PASS || 'test',
    database: process.env.DB_NAME || 'typeorm',
    synchronize: true,
    logging: false,
    entities: [
        process.env.NODE_ENV === 'PROD'
            ? 'dist/models/*.js'
            : 'src/models/*.ts',
    ],
    migrations: [
        process.env.NODE_ENV === 'PROD'
            ? 'dist/migrations/*.js'
            : 'src/migrations/*.ts',
    ],
    migrationsTableName: 'type_migrations',
    subscribers: [
        process.env.NODE_ENV === 'PROD'
            ? 'dist/subscribers/*.js'
            : 'src/subscribers/*.ts',
    ],
    cli: {
        entitiesDir: 'src/models',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscribers',
    },
};
