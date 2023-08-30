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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const companyActors_1 = __importDefault(require("./companyActors"));
const User_1 = require("../entity/User");
const Company_1 = require("../entity/Company");
const Employee_1 = require("../entity/Employee");
describe("companyActors", () => {
    let mockDataSource;
    beforeEach(() => {
        // Reset the mocks before each test
        mockDataSource = {
            manager: {
                findOne: jest.fn(),
                save: jest.fn(),
            },
        };
    });
    it("returns a 404 error if the user or company does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        mockDataSource.manager.findOne.mockResolvedValueOnce(null); // Simulate a non-existing user
        const result = yield (0, companyActors_1.default)(1, 1, mockDataSource);
        expect(result).toEqual({
            employee: null,
            status: 404,
            error: "User or Company not found",
        });
    }));
    it("creates a new employee if the user and company exist", () => __awaiter(void 0, void 0, void 0, function* () {
        mockDataSource.manager.findOne.mockResolvedValueOnce(new User_1.User()); // Simulate an existing user
        mockDataSource.manager.findOne.mockResolvedValueOnce(new Company_1.Company()); // Simulate an existing company
        const result = yield (0, companyActors_1.default)(1, 1, mockDataSource);
        expect(mockDataSource.manager.save).toHaveBeenCalled();
        expect(result.status).toBe(200);
        expect(result.employee).toBeInstanceOf(Employee_1.Employee);
    }));
});
