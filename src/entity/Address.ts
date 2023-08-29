import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Company } from "./Company";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  street!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column()
  zipCode!: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user!: User;

  @ManyToOne(() => Company, (company) => company.addresses)
  company!: Company;
}
