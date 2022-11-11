import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import routes from "./routes";
import {
    PORT_LISTENING_START_MESSAGE,
    DATABASE_CONNECTION_SUCCESS_MESSAGE,
    DATABASE_CONNECTION_ERROR_MESSAGE,
} from "./config/messages";
import config from "./config/config";
import { initializeProductsData } from "./seeders/products.seeder";
import routesPaths from "./config/routesPaths";

const { ROOT } = routesPaths;
const { NODE_PORT, MONGO_URI, CORS_ORIGIN } = config;

const app = express();

const corsOptions = {
    origin: CORS_ORIGIN,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

mongoose
    .connect(MONGO_URI, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log(DATABASE_CONNECTION_SUCCESS_MESSAGE()))
    .catch((err) => console.log(DATABASE_CONNECTION_ERROR_MESSAGE(err)));

mongoose.connection.on("connected", () => {
    initializeProductsData();
    console.log("Initialize product");
});
mongoose.connection.on("error", (err) => {
    console.log(DATABASE_CONNECTION_ERROR_MESSAGE(err));
});

app.use(ROOT, routes);

app.listen(NODE_PORT, "0.0.0.0", () => {
    console.log(PORT_LISTENING_START_MESSAGE(NODE_PORT));
});
