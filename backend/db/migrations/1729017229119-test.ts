import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1729017229119 implements MigrationInterface {
    name = 'Test1729017229119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prices-shop-0005" ("id" SERIAL NOT NULL, "date" date NOT NULL DEFAULT ('now'::text)::date, "price" numeric NOT NULL, "shop_id" character varying, "product_id" character varying, CONSTRAINT "PK_09a332594084124d7299aee8ef0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0005" ADD CONSTRAINT "FK_eda93d043fe9765cad69989c6ae" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0005" ADD CONSTRAINT "FK_ae6e3317c2207a74464f4a86292" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prices-shop-0005" DROP CONSTRAINT "FK_ae6e3317c2207a74464f4a86292"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0005" DROP CONSTRAINT "FK_eda93d043fe9765cad69989c6ae"`);
        await queryRunner.query(`DROP TABLE "prices-shop-0005"`);
    }

}
