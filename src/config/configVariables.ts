import dotenv from "dotenv";
import { TConfigVariables } from "../types/config.types";
dotenv.config();

const configVariables: TConfigVariables = {
    NODE_ENV: process.env.NODE_ENV || "development",
    NODE_PORT: Number(process.env.NODE_PORT) || 5000,
    NODE_HOST: process.env.NODE_HOST || "0.0.0.0",
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/shop",
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
};

export default configVariables;
