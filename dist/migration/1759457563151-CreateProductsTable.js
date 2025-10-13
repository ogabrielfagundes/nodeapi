"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductsTable1759449880839 = void 0;
const typeorm_1 = require("typeorm");
class CreateProductsTable1759449880839 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            yield queryRunner.createForeignKey("products", new typeorm_1.TableForeignKey({
                columnNames: ["productSituationId"],
                referencedTableName: "product_situations",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE"
            }));
            yield queryRunner.createForeignKey("products", new typeorm_1.TableForeignKey({
                columnNames: ["productCategoryId"],
                referencedTableName: "categories",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE"
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable("products");
            const foreingKey = table === null || table === void 0 ? void 0 : table.foreignKeys.find((fk) => fk.columnNames.includes("productSituationId"));
            if (foreingKey) {
                yield queryRunner.dropForeignKey("products", foreingKey);
            }
            yield queryRunner.dropTable("products");
            const table2 = yield queryRunner.getTable("products");
            const foreingKey2 = table2 === null || table2 === void 0 ? void 0 : table2.foreignKeys.find((fk) => fk.columnNames.includes("productCategoryId"));
            if (foreingKey2) {
                yield queryRunner.dropForeignKey("products", foreingKey2);
            }
            yield queryRunner.dropTable("products");
        });
    }
}
exports.CreateProductsTable1759449880839 = CreateProductsTable1759449880839;
