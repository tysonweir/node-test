import { DataSource } from "typeorm";

declare module "express-serve-static-core" {
  export interface Request {
    dataSource: DataSource;
  }
}
