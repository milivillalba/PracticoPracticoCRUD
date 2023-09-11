import jwt from "jsonwebtoken";
import { environments } from "../config/environments.js";

//funcion generar twt
//Esta función toma un argumento payload, que generalmente es un objeto JSON con información sobre el usuario u otra entidad para la que se está generando el JWT
export const generarJWT = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, environments.SECRET, (err, token) => {
      if (err) {
        reject("Error al generar el token");
      }

      resolve({ token });
    });
  });
};
//la funcion generartwt devuelve una promesa dentro de esta promesa se utiliza:
//"jwt.sig" para firmar el jwt con el payload y la clave secreta

//Una función de devolución de llamada (callback) que maneja el resultado de la firma.

//payload es un objeto de carga util
//el token se utiliza para autenticar a los usuarios y promocionarle accesos a ciertos recursos o servicios
