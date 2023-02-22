import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserEntity1677014144029 implements MigrationInterface {
  name = 'CreateUserEntity1677014144029';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"users_userrolewithsuperadmin_enum\" AS ENUM('OWNER', 'MANAGER', 'CONSUMER', 'SUPER_ADMIN')",
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"users_userstatus_enum\" AS ENUM('PENDING', 'ACTIVE', 'BLOCKED')",
    );
    await queryRunner.query(
      'CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "contactEmail" character varying, "birthDate" date NOT NULL, "UserRoleWithSuperAdmin" "public"."users_userrolewithsuperadmin_enum" NOT NULL, "UserStatus" "public"."users_userstatus_enum" NOT NULL DEFAULT \'PENDING\', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TYPE "public"."users_userstatus_enum"');
    await queryRunner.query('DROP TYPE "public"."users_userrolewithsuperadmin_enum"');
  }
}
