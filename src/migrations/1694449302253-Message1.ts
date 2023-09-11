import {MigrationInterface, QueryRunner} from "typeorm";

export class Message11694449302253 implements MigrationInterface {
    name = 'Message11694449302253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "create_at" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "create_at" SET NOT NULL`);
    }

}
