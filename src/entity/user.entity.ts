import { Entity, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "@/interfaces/user.interface"
import { CartEntity } from "./cart.entity"
import { OrderEntity } from "./order.entity"

@Entity("users")
export class UserEntity implements User {
    @PrimaryGeneratedColumn()
    userId: number

    @Column({ unique: true})
    username: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({
        default: false
    })
    isAdmin: boolean;

    @OneToMany(() => CartEntity, carts => carts.user)
    carts: CartEntity[]

    @OneToMany(() => OrderEntity, orders => orders.user)
    orders: CartEntity[]

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}