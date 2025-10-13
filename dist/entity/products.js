"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const typeorm_1 = require("typeorm");
const categories_1 = require("./categories");
const product_situations_1 = require("./product_situations");
let products = class products {
};
exports.products = products;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], products.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], products.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_1.categories, (categories) => categories.product),
    (0, typeorm_1.JoinColumn)({ name: "productCategoryId" }),
    __metadata("design:type", categories_1.categories)
], products.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_situations_1.product_situations, (product_situations) => product_situations.product),
    (0, typeorm_1.JoinColumn)({ name: "productSituationId" }),
    __metadata("design:type", product_situations_1.product_situations)
], products.prototype, "product_situation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], products.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], products.prototype, "updatedAt", void 0);
exports.products = products = __decorate([
    (0, typeorm_1.Entity)("products")
], products);
