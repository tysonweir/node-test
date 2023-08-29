import "reflect-metadata";
import { DataSource } from "typeorm";
import express from "express";
import { User } from "./entity/User";
import { Address } from "./entity/Address";
import { Employee } from "./entity/Employee";
import { Company } from "./entity/Company";
import userRoutes from "./routes/userRoutes";
import companyRoutes from "./routes/companyRoutes";
import addressRoutes from "./routes/addressRoutes";

const app = express();

app.use(express.json());

const dataSource = new DataSource({
  type: "sqlite",
  database: "mydb.sqlite",
  entities: [User, Company, Address, Employee],
  synchronize: true,
});

// Middleware to attach the DataSource to the request
app.use((req, res, next) => {
  req.dataSource = dataSource;
  next();
});

app.use(userRoutes);
app.use(companyRoutes);
app.use(addressRoutes);

const port = 3000;

dataSource
  .initialize()
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
