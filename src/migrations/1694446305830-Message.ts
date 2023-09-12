import {MigrationInterface, QueryRunner} from "typeorm";

export class Message1694446305830 implements MigrationInterface {
    name = 'Message1694446305830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "create_at" integer NOT NULL, "authorId" integer, "matchingId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "matching" ADD "created_at" integer`);
        await queryRunner.query(`ALTER TABLE "matching" ADD "last_message_sent" integer`);
        await queryRunner.query(`ALTER TABLE "matching" ADD CONSTRAINT "UQ_3135b9b27eaf54227e10a4f4e5d" UNIQUE ("last_message_sent")`);
        await queryRunner.query(`ALTER TABLE "matching" ALTER COLUMN "requestedat" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_819e6bb0ee78baf73c398dc707f" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_0074c02d26dddf541ef6440c903" FOREIGN KEY ("matchingId") REFERENCES "matching"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "matching" ADD CONSTRAINT "FK_3135b9b27eaf54227e10a4f4e5d" FOREIGN KEY ("last_message_sent") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matching" DROP CONSTRAINT "FK_3135b9b27eaf54227e10a4f4e5d"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_0074c02d26dddf541ef6440c903"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_819e6bb0ee78baf73c398dc707f"`);
        await queryRunner.query(`ALTER TABLE "matching" ALTER COLUMN "requestedat" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "matching" DROP CONSTRAINT "UQ_3135b9b27eaf54227e10a4f4e5d"`);
        await queryRunner.query(`ALTER TABLE "matching" DROP COLUMN "last_message_sent"`);
        await queryRunner.query(`ALTER TABLE "matching" DROP COLUMN "created_at"`);
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
