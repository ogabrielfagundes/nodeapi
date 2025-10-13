import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { users } from "./users";

@Entity("situations")
export class situations {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    nameSituation!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    @OneToMany(() => users, (users) => users.situation)
    users!: users[]
}