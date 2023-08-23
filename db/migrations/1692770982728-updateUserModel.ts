import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserModel1692770982728 implements MigrationInterface {
    name = 'UpdateUserModel1692770982728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "connect" integer array DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "connect"`);
    }

}
