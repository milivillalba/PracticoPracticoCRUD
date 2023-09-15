import express from "express";
import cors from "cors"; //restringe el acceso
import helmet from "helmet";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

//conexiones de carpetas
import { environments } from "./src/config/environments.js";
import { startDb } from "./src/config/db.js";
import { userRouter } from "./src/routes/users.routes.js";
import { authRouter } from "./src/routes/auth.routes.js";
import { testRouter } from "./src/routes/tes.routes.js";

import "./src/models/User.model.js";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ahora puedes usar __dirname en tu código
app.use(express.static(path.join(__dirname, "public")));

// Configurar middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Directorio donde se almacenan los archivos de registros
const logDirectory = path.join(__dirname, "logs");

// Asegurarse de que el directorio de registros exista
try {
  fs.mkdirSync(logDirectory, { recursive: true });
} catch (error) {
  console.error(`Error al crear el directorio de logs: ${error.message}`);
}

const logFilePath = path.join(logDirectory, "access.log");
console.log(logFilePath);

// Crear un stream de escritura para el archivo de registro
const accessLogStream = fs.createWriteStream(logFilePath, {
  flags: "a",
});

// Configurar morgan para utilizar el stream de escritura y el formato de registro deseado
app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.json());
app.use(
  cors({
    // el cors es un mecanismos de seguridad que restringe  las solicitudes http
    origin: "*", //el "*" es un comodin que significa "cualquier cosa" esto indica que cualquier dominio tiene permitido a tu api
    methods: ["GET", "POST"], //estos especifica slos metodos que estan permitido
  })
);
// app.use(morgan("dev"));
app.use(helmet());

app.use("/api/users", userRouter);

app.use("/auth", authRouter);

app.use("/test", testRouter);

app.listen(environments.PORT, async () => {
  console.log(`server on port ${environments.PORT}`);
  startDb();
});
