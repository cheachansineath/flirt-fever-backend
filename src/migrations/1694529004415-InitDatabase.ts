import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDatabase1694529004415 implements MigrationInterface {
    name = 'InitDatabase1694529004415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "otp" ("id" SERIAL NOT NULL, "pin" character varying NOT NULL, "user" integer NOT NULL, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(50) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "verify" boolean, "gender" character varying, "height" double precision, "weight" double precision, "age" integer, "location" character varying, "profile_url" character varying, "bio" character varying(100), "interest" text DEFAULT '[]', "page" integer NOT NULL DEFAULT '1', "preference" character varying, "deletedAt" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "matching" ("id" SERIAL NOT NULL, "accept" boolean NOT NULL DEFAULT false, "deletedAt" TIMESTAMP, "requestedat" TIMESTAMP NOT NULL, "created_at" integer, "fromUserId" integer, "toUserId" integer, "last_message_sent" integer, CONSTRAINT "REL_3135b9b27eaf54227e10a4f4e5" UNIQUE ("last_message_sent"), CONSTRAINT "PK_8742e3f46179f5e5a5994d8861c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, "matchingId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "imageUrl" character varying NOT NULL, "description" character varying NOT NULL, "category" character varying NOT NULL, "location" character varying NOT NULL, "datePost" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vote" ("id" SERIAL NOT NULL, "value" boolean NOT NULL, "userId" integer, "postId" integer, CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "matching" ADD CONSTRAINT "FK_afd35a5cce0029baa71205a1eeb" FOREIGN KEY ("fromUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "matching" ADD CONSTRAINT "FK_a6383fd2074304f517fd0520652" FOREIGN KEY ("toUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "matching" ADD CONSTRAINT "FK_3135b9b27eaf54227e10a4f4e5d" FOREIGN KEY ("last_message_sent") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_819e6bb0ee78baf73c398dc707f" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_0074c02d26dddf541ef6440c903" FOREIGN KEY ("matchingId") REFERENCES "matching"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_f5de237a438d298031d11a57c3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_43cc1af57676ac1b7ec774bd10f" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_43cc1af57676ac1b7ec774bd10f"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_f5de237a438d298031d11a57c3b"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_0074c02d26dddf541ef6440c903"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_819e6bb0ee78baf73c398dc707f"`);
        await queryRunner.query(`ALTER TABLE "matching" DROP CONSTRAINT "FK_3135b9b27eaf54227e10a4f4e5d"`);
        await queryRunner.query(`ALTER TABLE "matching" DROP CONSTRAINT "FK_a6383fd2074304f517fd0520652"`);
        await queryRunner.query(`ALTER TABLE "matching" DROP CONSTRAINT "FK_afd35a5cce0029baa71205a1eeb"`);
        await queryRunner.query(`DROP TABLE "vote"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "matching"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "otp"`);
    }

}
