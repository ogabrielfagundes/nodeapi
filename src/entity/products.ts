import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { categories } from "./categories";
import { product_situations } from "./product_situations";

@Entity("products")
export class products {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToOne(() => categories, (categories) => categories.product)
    @JoinColumn({ name: "productCategoryId" })
    category!: categories;

    @ManyToOne(() => product_situations, (product_situations) => product_situations.product)
    @JoinColumn({ name: "productSituationId" })
    product_situation!: product_situations;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}