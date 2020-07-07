import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial implements MigrationInterface {
    name = 'Initial';

    public async up(queryRunner: QueryRunner): Promise<void> {}

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
