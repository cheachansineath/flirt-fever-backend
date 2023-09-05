import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMatchingRequestTime1693319071433 implements MigrationInterface {
    name = 'AddMatchingRequestTime1693319071433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matching" ADD "requestedAt" TIMESTAMP NOT NULL'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matching" DROP COLUMN "requestedAt"`);
    }

}
