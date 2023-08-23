import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOtpModel1692771566838 implements MigrationInterface {
    name = 'UpdateOtpModel1692771566838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp" DROP CONSTRAINT "FK_db724db1bc3d94ad5ba38518433"`);
        await queryRunner.query(`ALTER TABLE "otp" RENAME COLUMN "userId" TO "user"`);
        await queryRunner.query(`ALTER TABLE "otp" ALTER COLUMN "user" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp" ALTER COLUMN "user" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "otp" RENAME COLUMN "user" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "otp" ADD CONSTRAINT "FK_db724db1bc3d94ad5ba38518433" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
