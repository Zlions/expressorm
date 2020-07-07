import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1594061203934 implements MigrationInterface {
    name = 'Auto1594061203934';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying, "lastName" character varying, "age" integer, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
