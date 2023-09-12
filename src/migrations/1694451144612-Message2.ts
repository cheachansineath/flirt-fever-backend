import {MigrationInterface, QueryRunner} from "typeorm";

export class Message21694451144612 implements MigrationInterface {
    name = 'Message21694451144612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "create_at" integer`);
    }

}
