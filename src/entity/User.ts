import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Address } from "./Address";
import { Employee } from "./Employee";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @OneToMany(() => Employee, (employee) => employee.user)
  employees!: Employee[];

  @OneToMany(() => Address, (address) => address.user)
  addresses!: Address[];
}
