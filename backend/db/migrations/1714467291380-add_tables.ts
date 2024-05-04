import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTables1714467291380 implements MigrationInterface {
    name = 'AddTables1714467291380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prices-shop-0002" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "price" numeric NOT NULL, "shop_id" character varying, "product_id" character varying, CONSTRAINT "PK_5a4caef3e1334b9aa3e8b1a961d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shops" ("id" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3c6aaa6607d287de99815e60b96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prices-shop-0001" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "price" numeric NOT NULL, "shop_id" character varying, "product_id" character varying, CONSTRAINT "PK_062be770d34c398160faf30e8df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prices-shop-0003" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "price" numeric NOT NULL, "shop_id" character varying, "product_id" character varying, CONSTRAINT "PK_820f2839acde988257e9670529e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0002" ADD CONSTRAINT "FK_8ce58549aa24ee68e57d2e0639a" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0002" ADD CONSTRAINT "FK_c3a3c03d31fe36e8d25dee44969" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0001" ADD CONSTRAINT "FK_acba99753355cb26ddf128c221c" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0001" ADD CONSTRAINT "FK_36cd89a04b46122b009d1983255" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0003" ADD CONSTRAINT "FK_10cb7aef01d29a6397593df9a5e" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0003" ADD CONSTRAINT "FK_2b9253a0cbb31e770e0c6c4bd6b" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prices-shop-0003" DROP CONSTRAINT "FK_2b9253a0cbb31e770e0c6c4bd6b"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0003" DROP CONSTRAINT "FK_10cb7aef01d29a6397593df9a5e"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0001" DROP CONSTRAINT "FK_36cd89a04b46122b009d1983255"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0001" DROP CONSTRAINT "FK_acba99753355cb26ddf128c221c"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0002" DROP CONSTRAINT "FK_c3a3c03d31fe36e8d25dee44969"`);
        await queryRunner.query(`ALTER TABLE "prices-shop-0002" DROP CONSTRAINT "FK_8ce58549aa24ee68e57d2e0639a"`);
        await queryRunner.query(`DROP TABLE "prices-shop-0003"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "prices-shop-0001"`);
        await queryRunner.query(`DROP TABLE "shops"`);
        await queryRunner.query(`DROP TABLE "prices-shop-0002"`);
    }

}
