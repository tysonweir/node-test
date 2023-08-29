import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Company } from "./Company";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.employees)
  user!: User;

  @ManyToOne(() => Company, (company) => company.employees)
  company!: Company;
}
