import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1691577970822 implements MigrationInterface {
    name = 'NewMigration1691577970822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(50) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "verify" boolean NOT NULL, "gender" character varying NOT NULL, "height" integer NOT NULL, "weight" integer NOT NULL, "age" integer NOT NULL, "location" character varying NOT NULL, "profile_url" character varying NOT NULL, "bio" character varying(100) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "matching" ("id" SERIAL NOT NULL, "agreement" boolean NOT NULL, "response" boolean NOT NULL, "fromUserId" integer, "toUserId" integer, CONSTRAINT "PK_8742e3f46179f5e5a5994d8861c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" SERIAL NOT NULL, "pin" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "imageUrl" character varying NOT NULL, "description" character varying NOT NULL, "category" character varying NOT NULL, "location" character varying NOT NULL, "datePost" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vote" ("id" SERIAL NOT NULL, "value" boolean NOT NULL, "userId" integer, "postId" integer, CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "matching" ADD CONSTRAINT "FK_afd35a5cce0029baa71205a1eeb" FOREIGN KEY ("fromUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "matching" ADD CONSTRAINT "FK_a6383fd2074304f517fd0520652" FOREIGN KEY ("toUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "otp" ADD CONSTRAINT "FK_db724db1bc3d94ad5ba38518433" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_f5de237a438d298031d11a57c3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_43cc1af57676ac1b7ec774bd10f" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_43cc1af57676ac1b7ec774bd10f"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_f5de237a438d298031d11a57c3b"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "otp" DROP CONSTRAINT "FK_db724db1bc3d94ad5ba38518433"`);
        await queryRunner.query(`ALTER TABLE "matching" DROP CONSTRAINT "FK_a6383fd2074304f517fd0520652"`);
        await queryRunner.query(`ALTER TABLE "matching" DROP CONSTRAINT "FK_afd35a5cce0029baa71205a1eeb"`);
        await queryRunner.query(`DROP TABLE "vote"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`DROP TABLE "matching"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
