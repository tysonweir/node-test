"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const User_1 = require("./entity/User");
const Address_1 = require("./entity/Address");
const Employee_1 = require("./entity/Employee");
const Company_1 = require("./entity/Company");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const companyRoutes_1 = __importDefault(require("./routes/companyRoutes"));
const addressRoutes_1 = __importDefault(require("./routes/addressRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const dataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "mydb.sqlite",
    entities: [User_1.User, Company_1.Company, Address_1.Address, Employee_1.Employee],
    synchronize: true,
});
// Middleware to attach the DataSource to the request
app.use((req, res, next) => {
    req.dataSource = dataSource;
    next();
});
app.use(userRoutes_1.default);
app.use(companyRoutes_1.default);
app.use(addressRoutes_1.default);
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
