import { body } from "express-validator";

export const registerValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Min 6 chars"),
];

export const loginValidator = [
    body("email").isEmail(),
    body("password").notEmpty(),
];
