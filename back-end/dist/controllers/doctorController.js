"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDoctors = void 0;
const doctors_1 = require("../data/doctors");
const getAllDoctors = (req, res) => {
    res.json(doctors_1.doctors);
};
exports.getAllDoctors = getAllDoctors;
