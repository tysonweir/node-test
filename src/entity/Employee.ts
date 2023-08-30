import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from "typeorm";
import { User } from "./User";
import { Company } from "./Company";

@Entity()
@Unique(["user", "company"])
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.employees)
  user!: User;

  @ManyToOne(() => Company, (company) => company.employees)
  company!: Company;
}
