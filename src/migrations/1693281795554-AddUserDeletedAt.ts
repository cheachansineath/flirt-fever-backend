import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserDeletedAt1693281795554 implements MigrationInterface {
    name = 'AddUserDeletedAt1693281795554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
    }

}
