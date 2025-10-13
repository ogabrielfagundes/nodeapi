import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { products } from "./products";

@Entity("categories")
export class categories {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    @OneToMany(() => products, (products) => products.category)
    product!: products[]
}