import { Product } from "@/interfaces/product.interface";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CartEntity } from "./cart.entity";
import { OrderEntity } from "./order.entity";

@Entity("products")
export class ProductEntity implements Product {
    @PrimaryGeneratedColumn()
    productId: number

    @Column()
    title: string

    @Column({})
    description: string

    @Column()
    image: string

    @Column({ default: "" })
    categories: string

    @Column()
    size: string

    @Column()
    color: string

    @Column()
    price: number;

    @OneToMany(() => CartEntity, carts => carts.product)
    carts: CartEntity[]

    @OneToMany(() => OrderEntity, orders => orders.product)
    orders: OrderEntity[]

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}