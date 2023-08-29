import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserInterest1693279778560 implements MigrationInterface {
    name = 'UpdateUserInterest1693279778560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "connect" TO "interest"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "interest"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "interest" text DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "interest"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "interest" integer array DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "interest" TO "connect"`);
    }

}
