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
  const token = req.headers.authorization; // busca el token de autorizacion en el encabezado "authorization"

  if (!token) {
    return res.sendStatus(404);
  }
  //si se propociona el token se verifyca y decifra el token obteniendo el id del usuario
  const { user: userId } = Jwt.verify(token, environments.SECRET);
  //utiliza la funcion getUserById para al usuario en la db
  const user = await getUserById(userId);

  if (!user) {
    return res.sendStatus(401).json({ message: "No hay token en la peticion" });
  }

  res.status(200).json(user);
};

//este codigo se utiliza para autenticar a los usuarios a traves de tokens de autorizacion
//verificar su identidad, y proporcionar información sobre el usuario autenticado
