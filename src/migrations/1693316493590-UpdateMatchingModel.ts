import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateMatchingModel1693316493590 implements MigrationInterface {
    name = 'UpdateMatchingModel1693316493590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matching" DROP COLUMN "agreement"`);
        await queryRunner.query(`ALTER TABLE "matching" DROP COLUMN "response"`);
        await queryRunner.query(`ALTER TABLE "matching" ADD "accept" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "matching" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matching" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "matching" DROP COLUMN "accept"`);
        await queryRunner.query(`ALTER TABLE "matching" ADD "response" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "matching" ADD "agreement" boolean NOT NULL`);
    }

}
