import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1728999041526 implements MigrationInterface {
    name = 'Test1728999041526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prices-shop-0002" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0002" ADD "date" date NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0003" ALTER COLUMN "date" SET DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0004" ALTER COLUMN "date" SET DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0001" ALTER COLUMN "date" SET DEFAULT ('now'::text)::date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prices-shop-0001" ALTER COLUMN "date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0004" ALTER COLUMN "date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0003" ALTER COLUMN "date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0002" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0002" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
