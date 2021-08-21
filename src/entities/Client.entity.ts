import { Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from "typeorm";
import { Banker } from "./Banker.entity";
import { Transaction } from "./Transaction.entity";
import { Person } from "./utils/Person.entity";

@Entity('clients')
export class Client extends Person {
  @Column({ type: "numeric" })
  balance: number;

  @Column({ default: true, name: 'active' })
  is_active: boolean;

  @Column({ type: 'simple-json', nullable: true })
  additional_info: {
    age: number;
    hair_color: number;
  }

  // @Column({ type: 'simple-array' })
  // family_members: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Transaction, transaction => transaction.client)
  transactions: Transaction[];

  @ManyToMany(() => Banker)
  bankers: Banker[];
}