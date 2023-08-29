import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserPreference1693282613897 implements MigrationInterface {
    name = 'AddUserPreference1693282613897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "preference" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "preference"`);
    }

}
