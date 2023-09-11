import { createUser, getAllUsers } from "../models/User.model.js";

//solisitud para obtener tos los usuarios
export const ctrlGetAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    if (!users) {
      return res.sendStatus(404);
    }

    res.status(200).json(users);
  } catch (error) {
    console.log("error insesperado", error);
  }
};

//solisitud para crear un usuario

export const CtrlcreateUser = async (req, res) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    console.log("Error al crear el nuevo usuario", error);
  }
};
