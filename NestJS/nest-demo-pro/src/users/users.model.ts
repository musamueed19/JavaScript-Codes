import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "users"})
export class UserModel {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", { length: 255 })
    name: string;

    @Column("varchar", { length: 255, unique: true })
    email: string;

    @Column("varchar", { length: 255 })
    password: string;


    @Column("varchar", { length: 255, nullable: true })
    avatarUrl?: string;


    @Column("varchar", { length: 255, nullable: true })
    bio?: string;

    @Column("varchar", { length: 255, nullable: true })
    location?: string;

    @Column("varchar", { length: 255, nullable: true })
    website?: string;


    /**
     * 用户角色，例如 "admin", "employee", "intern", "manager", "team lead" 等，可以根据需要进行扩展
     * 
     */
    @Column("varchar", { length: 255, nullable: true })
    role: string;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}