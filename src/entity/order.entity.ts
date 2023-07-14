import { Order } from "@/interfaces/order.interface";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { UserEntity } from "./user.entity";

@Entity("orders")
export class OrderEntity implements Order {
    @PrimaryGeneratedColumn()
    orderId: number

    @Column()
    quantity: number

    @Column({ type: "numeric" })
    amount: number

    @Column()
    address: string

    @Column({ default: "pending" })
    status: string

    @ManyToOne(() => UserEntity, user => user.orders)
    @JoinColumn({ name: "userId"})
    user: UserEntity

    @ManyToOne(() => ProductEntity, products => products.orders)
    @JoinColumn({ name: "productId"})
    product: ProductEntity

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}