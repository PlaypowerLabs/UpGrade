import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1733374499650 implements MigrationInterface {
  name = 'Migrations1733374499650';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "organization" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "versionNumber" integer NOT NULL, "id" character varying NOT NULL, "name" character varying NOT NULL, "secretKey" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "feature_flag" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "segment" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "stratification_factor" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "experiment" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "metric" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "log" ADD "experimentId" character varying`);
    await queryRunner.query(`ALTER TABLE "log" ADD "featureFlagId" character varying`);
    await queryRunner.query(`ALTER TABLE "experiment_user" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "monitored_decision_point" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "preview_user" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "user" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "feature_flag" ALTER COLUMN "description" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "feature_flag" ADD CONSTRAINT "FK_c983af105e34058e08a47949425" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "segment" ADD CONSTRAINT "FK_058abd09f677c8df590d5ebcbf2" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "stratification_factor" ADD CONSTRAINT "FK_2a44d2c54c0a813883409856812" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "experiment" ADD CONSTRAINT "FK_0426779bd58d26cbe832c9af800" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "metric" ADD CONSTRAINT "FK_f761713760ba5b90cd70c906a3e" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "experiment_user" ADD CONSTRAINT "FK_6c9e6e01e238cf391f19caf1541" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "monitored_decision_point" ADD CONSTRAINT "FK_7118ba3f26783d02828d2ad21ac" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "preview_user" ADD CONSTRAINT "FK_fbb501b04d3d6b74f7427cd4066" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dfda472c0af7812401e592b6a61"`);
    await queryRunner.query(`ALTER TABLE "preview_user" DROP CONSTRAINT "FK_fbb501b04d3d6b74f7427cd4066"`);
    await queryRunner.query(`ALTER TABLE "monitored_decision_point" DROP CONSTRAINT "FK_7118ba3f26783d02828d2ad21ac"`);
    await queryRunner.query(`ALTER TABLE "experiment_user" DROP CONSTRAINT "FK_6c9e6e01e238cf391f19caf1541"`);
    await queryRunner.query(`ALTER TABLE "metric" DROP CONSTRAINT "FK_f761713760ba5b90cd70c906a3e"`);
    await queryRunner.query(`ALTER TABLE "experiment" DROP CONSTRAINT "FK_0426779bd58d26cbe832c9af800"`);
    await queryRunner.query(`ALTER TABLE "stratification_factor" DROP CONSTRAINT "FK_2a44d2c54c0a813883409856812"`);
    await queryRunner.query(`ALTER TABLE "segment" DROP CONSTRAINT "FK_058abd09f677c8df590d5ebcbf2"`);
    await queryRunner.query(`ALTER TABLE "feature_flag" DROP CONSTRAINT "FK_c983af105e34058e08a47949425"`);
    await queryRunner.query(`ALTER TABLE "feature_flag" ALTER COLUMN "description" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "preview_user" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "monitored_decision_point" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "experiment_user" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "featureFlagId"`);
    await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "experimentId"`);
    await queryRunner.query(`ALTER TABLE "metric" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "experiment" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "stratification_factor" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "segment" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "feature_flag" DROP COLUMN "organizationId"`);
    await queryRunner.query(`DROP TABLE "organization"`);
  }
}
