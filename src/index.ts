import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import routes from "./routes";
import routesPaths from "./config/routesPaths";
import configVariables from "./config/configVariables";

import {
    mongoStatuses,
    PORT_LISTENING_START_MESSAGE,
    DATABASE_CONNECTION_SUCCESS_MESSAGE,
    DATABASE_CONNECTION_ERROR_MESSAGE,
} from "./config/database";

import { initializeProductData } from "./seeders/products.seeder";

const { ROOT } = routesPaths;
const { NODE_PORT, NODE_HOST, MONGO_URI, CORS_ORIGIN } = configVariables;
const { CONNECTED, ERROR } = mongoStatuses;

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

mongoose.connection.on(CONNECTED, () => {
    initializeProductData();
});
mongoose.connection.on(ERROR, (err) => {
    console.log(DATABASE_CONNECTION_ERROR_MESSAGE(err));
});

app.use(ROOT, routes);

app.listen(NODE_PORT, NODE_HOST, () => {
    console.log(PORT_LISTENING_START_MESSAGE(NODE_PORT));
});
