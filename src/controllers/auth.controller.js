import { generarJWT } from "../helpers/generar_jwt.js";
import {
  createUser,
  getUserByEmailAndPassword,
  getUserById,
} from "../models/User.model.js";
import { environments } from "../config/environments.js";

//controller para el LOGIN
export const ctrlLoginUser = async (req, res) => {
  try {
    const user = await getUserByEmailAndPassword(req.body);

    const token = await generarJWT({ user: user.id });

    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
//Controller para el Registro
export const ctrlRegisterUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    const token = await generarJWT({ user: user.id });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

//este controlador  se va usar para validar el token
export const ctrlGetUserInfoByToken = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(404);
  }

  const { user: userId } = Jwt.verify(token, environments.SECRET);

  const user = await getUserById(userId);

  if (!user) {
    return res.sendStatus(401);
  }

  res.status(200).json(user);
};
