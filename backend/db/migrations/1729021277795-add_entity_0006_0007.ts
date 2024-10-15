import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEntity000600071729021277795 implements MigrationInterface {
    name = 'AddEntity000600071729021277795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prices-shop-0006" ("id" SERIAL NOT NULL, "date" date NOT NULL DEFAULT ('now'::text)::date, "price" numeric NOT NULL, "shop_id" character varying, "product_id" character varying, CONSTRAINT "PK_67068c4ef74ca98f2e7e0c0e702" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prices-shop-0007" ("id" SERIAL NOT NULL, "date" date NOT NULL DEFAULT ('now'::text)::date, "price" numeric NOT NULL, "shop_id" character varying, "product_id" character varying, CONSTRAINT "PK_ad2ee8b79cabde58d14e8f8bb93" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0006" ADD CONSTRAINT "FK_6379fe147f3006b3e035b95836e" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0006" ADD CONSTRAINT "FK_19416f535ba59f622efd0914d66" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0007" ADD CONSTRAINT "FK_248648bc9e01e0d036487bb39a9" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0007" ADD CONSTRAINT "FK_19f9d4824dc5dd16d3c59d053bc" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prices-shop-0007" DROP CONSTRAINT "FK_19f9d4824dc5dd16d3c59d053bc"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0007" DROP CONSTRAINT "FK_248648bc9e01e0d036487bb39a9"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0006" DROP CONSTRAINT "FK_19416f535ba59f622efd0914d66"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0006" DROP CONSTRAINT "FK_6379fe147f3006b3e035b95836e"`);
        await queryRunner.query(`DROP TABLE "prices-shop-0007"`);
        await queryRunner.query(`DROP TABLE "prices-shop-0006"`);
    }

}
