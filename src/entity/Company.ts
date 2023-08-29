// src/entities/Company.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Employee } from "./Employee";
import { Address } from "./Address";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  businessName!: string;

  @Column()
  businessType!: string;

  @OneToMany(() => Employee, (employee) => employee.company)
  employees!: Employee[];

  @OneToMany(() => Address, (address) => address.company)
  addresses!: Address[];
}
