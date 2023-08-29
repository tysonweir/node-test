"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../entity/User");
const Employee_1 = require("../entity/Employee");
const Company_1 = require("../entity/Company");
const router = (0, express_1.Router)();
// a. Make a User an Employee of a Company
router.put("/user/:userId/company/:companyId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    const companyId = Number(req.params.companyId);
    const user = yield req.dataSource.manager.findOne(User_1.User, {
        where: { id: userId },
    });
    const company = yield req.dataSource.manager.findOne(Company_1.Company, {
        where: { id: companyId },
    });
    if (!user || !company) {
        return res.status(404).send({ error: "User or Company not found" });
    }
    const employee = new Employee_1.Employee();
    employee.user = user;
    employee.company = company;
    yield req.dataSource.manager.save(employee);
    res.send({ employee });
}));
//a.1 This will post a new employee to the company
router.post("/user/:userId/company/:companyId/employee", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    const companyId = Number(req.params.companyId);
    const user = yield req.dataSource.manager.findOne(User_1.User, {
        where: { id: userId },
    });
    const company = yield req.dataSource.manager.findOne(Company_1.Company, {
        where: { id: companyId },
    });
    if (!user || !company) {
        return res.status(404).send({ error: "User or Company not found" });
    }
    const employee = new Employee_1.Employee();
    employee.user = user;
    employee.company = company;
    yield req.dataSource.manager.save(employee);
    res.send({ employee });
}));
// b. Get number of employees for a Company
router.get("/company/:companyId/employees", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companyId = Number(req.params.companyId);
    const company = yield req.dataSource.manager.findOne(Company_1.Company, {
        where: { id: companyId },
    });
    if (!company) {
        return res.status(404).send({ error: "Company not found" });
    }
    const employeeCount = yield req.dataSource.manager.count(Employee_1.Employee, {
        where: { company },
    });
    res.send({ employeeCount });
}));
// c. Get number of companies for each business type
router.get("/companies/businessTypes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companies = yield req.dataSource.manager.find(Company_1.Company);
    const businessTypes = companies.map((company) => company.businessType);
    const businessTypeCount = businessTypes.reduce((acc, businessType) => {
        if (!acc[businessType]) {
            acc[businessType] = 1;
        }
        else {
            acc[businessType] += 1;
        }
        return acc;
    }, {});
    res.send({ businessTypeCount });
}));
router.post("/company", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newCompany = new Company_1.Company();
        newCompany.businessName = req.body.businessName;
        newCompany.businessType = req.body.businessType;
        let savedCompany = yield req.dataSource.manager.save(newCompany);
        res.status(201).json(savedCompany);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while saving the company.");
    }
}));
exports.default = router;
