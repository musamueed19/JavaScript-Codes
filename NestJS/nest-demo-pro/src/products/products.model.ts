import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'products' })
export class ProductModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 500, unique: true })
    name: string;
    
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
    
    @Column('text', { nullable: true })
    description: string;
    
    @Column('varchar', { length: 2048, nullable: true })
    imageUrl?: string;
    
    @Column('int', {default: 0})
    available_stock: number;
    
}