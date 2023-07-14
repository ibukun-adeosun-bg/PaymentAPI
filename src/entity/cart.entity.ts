import { Cart } from "@/interfaces/cart.interface";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { UserEntity } from "./user.entity";
import { ProductEntity } from "./product.entity";

@Entity("carts")
export class CartEntity implements Cart {
    @PrimaryColumn()
    cartId: string

    @Column()
    quantity: number

    @ManyToOne(() => UserEntity, user => user.carts)
    @JoinColumn({ name: "userId"})
    user: UserEntity

    @ManyToOne(() => ProductEntity, products => products.carts)
    @JoinColumn({ name: "productId"})
    product: ProductEntity

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}