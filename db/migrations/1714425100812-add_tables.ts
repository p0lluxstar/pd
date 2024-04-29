import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTables1714425100812 implements MigrationInterface {
    name = 'AddTables1714425100812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shops" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3c6aaa6607d287de99815e60b96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "price-shop-0001" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "shop_id" character varying NOT NULL, "price" numeric NOT NULL, "product_id" character varying, CONSTRAINT "PK_5495c90d4954055188a795c40c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "price-shop-0003" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "shop_id" character varying NOT NULL, "price" numeric NOT NULL, "product_id" character varying, CONSTRAINT "PK_08b425e4eda77d74e04d62636f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "price-shop-0002" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "shop_id" character varying NOT NULL, "price" numeric NOT NULL, "product_id" character varying, CONSTRAINT "PK_f73d32a7433c123554d567e1cc5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "price-shop-0001" ADD CONSTRAINT "FK_e24e9d87a90b48facc941495cc2" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "price-shop-0003" ADD CONSTRAINT "FK_a1c8fcb84b9eed9bae718d98bb8" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "price-shop-0002" ADD CONSTRAINT "FK_3455bb43e80ef1ff34a06e8fdfe" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price-shop-0002" DROP CONSTRAINT "FK_3455bb43e80ef1ff34a06e8fdfe"`);
        await queryRunner.query(`ALTER TABLE "price-shop-0003" DROP CONSTRAINT "FK_a1c8fcb84b9eed9bae718d98bb8"`);
        await queryRunner.query(`ALTER TABLE "price-shop-0001" DROP CONSTRAINT "FK_e24e9d87a90b48facc941495cc2"`);
        await queryRunner.query(`DROP TABLE "price-shop-0002"`);
        await queryRunner.query(`DROP TABLE "price-shop-0003"`);
        await queryRunner.query(`DROP TABLE "price-shop-0001"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "shops"`);
    }

}
