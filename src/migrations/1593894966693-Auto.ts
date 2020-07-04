import {MigrationInterface, QueryRunner} from "typeorm";

export class Auto1593894966693 implements MigrationInterface {
    name = 'Auto1593894966693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "another" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_c64ac15cd95eed391a24f6058b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aaaaa" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_2ae6561ab529ea93567b775bee9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "aaaaa"`);
        await queryRunner.query(`DROP TABLE "another"`);
    }

}
