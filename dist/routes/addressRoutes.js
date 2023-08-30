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
const Address_1 = require("../entity/Address");
const router = (0, express_1.Router)();
// add this route to help add addresses to the database
router.post("/addresses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let addAddress = new Address_1.Address();
        addAddress.street = req.body.street;
        addAddress.city = req.body.city;
        addAddress.state = req.body.state;
        addAddress.zipCode = req.body.zipCode;
        let savedAddress = yield req.dataSource.manager.save(addAddress);
        res.status(201).json(savedAddress);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while saving the user.");
    }
}));
exports.default = router;
