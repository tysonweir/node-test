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
const Company_1 = require("../entity/Company");
const Employee_1 = require("../entity/Employee");
const User_1 = require("../entity/User");
function companyActors(userId, companyId, dataSource) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield dataSource.manager.findOne(User_1.User, {
            where: { id: userId },
        });
        const company = yield dataSource.manager.findOne(Company_1.Company, {
            where: { id: companyId },
        });
        if (!user || !company) {
            return { employee: null, status: 404, error: "User or Company not found" };
        }
        const employee = new Employee_1.Employee();
        employee.user = user;
        employee.company = company;
        yield dataSource.manager.save(employee);
        return { employee: employee, status: 200 };
    });
}
exports.default = companyActors;
