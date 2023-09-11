import { body } from "express-validator";

export const createUserSchema = [
  body("username")
    .exists()
    .notEmpty()
    .withMessage("El nombre de usuario no debe estar vacio")
    .isString()
    .withMessage("El nombre de usuario debe ser de caracter"),
  body("password").exists().notEmpty().isString(),
  body("email").exists().notEmpty().isEmail(), //verifica que el correo electronico sea valido
];

export const loginUserSchema = [
  body("email").exists().notEmpty().isEmail(),
  body("password").exists().notEmpty().isString(),
];

//autenticar se refiere al proseso de verificar la identidad de un usuario
