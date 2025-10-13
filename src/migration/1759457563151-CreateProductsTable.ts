import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductsTable1759449880839 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "products",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "productCategoryId",
                    type: "int"
                },
                {
                    name: "productSituationId",
                    type: "int"
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                }
            ]
        }));

        await queryRunner.createForeignKey(
            "products",
            new TableForeignKey({
                columnNames: ["productSituationId"],
                referencedTableName: "product_situations",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE"
            })
        )

        await queryRunner.createForeignKey(
            "products",
            new TableForeignKey({
                columnNames: ["productCategoryId"],
                referencedTableName: "categories",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE"
            })
        )

    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("products");
        const foreingKey = table?.foreignKeys.find((fk) => fk.columnNames.includes("productSituationId"));
        if (foreingKey) {
            await queryRunner.dropForeignKey("products", foreingKey)
        }
        await queryRunner.dropTable("products")

        const table2 = await queryRunner.getTable("products");
        const foreingKey2 = table2?.foreignKeys.find((fk) => fk.columnNames.includes("productCategoryId"));
        if (foreingKey2) {
            await queryRunner.dropForeignKey("products", foreingKey2)
        }
        await queryRunner.dropTable("products")
    }

}