import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1728999129469 implements MigrationInterface {
    name = 'Test1728999129469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prices-shop-0002" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0002" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0003" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0003" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0004" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0004" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0001" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0001" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prices-shop-0001" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0001" ADD "date" date NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0004" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0004" ADD "date" date NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0003" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0003" ADD "date" date NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0002" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0002" ADD "date" date NOT NULL DEFAULT ('now'::text)::date`);
    }

}
