import "dotenv/config";

export const environments = {
  PORT: process.env.PORT || 4800, //SECRET es una propiedad y ella presenta una clave secreta que generalmente se utiliza para firmar y verificar tokens de autenticacion
  SECRET: process.env.SECRET || "MV", //Esta propiedad define la clave secreta
  DB: {
    DB_NAME: process.env.DB_NAME || "dbcrud",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_DIALECT: process.env.DB_DIALECT || "mysql",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "",
    DB_PORT: process.env.DB_PORT || 3306,
  },
};
