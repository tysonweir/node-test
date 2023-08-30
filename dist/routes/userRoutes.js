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
const router = (0, express_1.Router)();
// add this route to help add users to the database
router.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newUser = new User_1.User();
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.email = req.body.email;
        let savedUser = yield req.dataSource.manager.save(newUser);
        res.status(201).json(savedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while saving the user.");
    }
}));
exports.default = router;
