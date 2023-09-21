import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserDob1695132383555 implements MigrationInterface {
    name = 'addUserDob1695132383555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "dob" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "dob"`);
    }

}
