import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFloat1692764841324 implements MigrationInterface {
    name = 'UpdateFloat1692764841324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "height" double precision`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "weight" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "weight" integer`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "height" integer`);
    }

}
