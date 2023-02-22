import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmailActivationEntity1677094330020 implements MigrationInterface {
  name = 'CreateEmailActivationEntity1677094330020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"EmailActivationStatus\" AS ENUM('PENDING', 'EXPIRED', 'ACCEPTED')",
    );
    await queryRunner.query(
      'CREATE TABLE "email-activation" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."EmailActivationStatus" NOT NULL DEFAULT \'PENDING\', "userId" integer NOT NULL, CONSTRAINT "PK_244cc37a24b6a31ec617937f22a" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "email-activation" ADD CONSTRAINT "FK_3fddc1d9119f8f675b6ad4abf05" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "email-activation" DROP CONSTRAINT "FK_3fddc1d9119f8f675b6ad4abf05"',
    );
    await queryRunner.query('DROP TABLE "email-activation"');
    await queryRunner.query('DROP TYPE "public"."EmailActivationStatus"');
  }
}
