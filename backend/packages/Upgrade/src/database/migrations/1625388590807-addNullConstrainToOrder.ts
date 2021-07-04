import {MigrationInterface, QueryRunner} from "typeorm";

export class addNullConstrainToOrder1625388590807 implements MigrationInterface {
    name = 'addNullConstrainToOrder1625388590807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experiment_condition" ALTER COLUMN "order" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "experiment_partition" ALTER COLUMN "order" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experiment_partition" ALTER COLUMN "order" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "experiment_condition" ALTER COLUMN "order" SET NOT NULL`);
    }

}
