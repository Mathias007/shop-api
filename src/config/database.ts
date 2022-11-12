import { TCollections, TDatabaseStatuses } from "../types/config.types";

export const collections: TCollections = {
    products: "products",
};

export const mongoStatuses: TDatabaseStatuses = {
    CONNECTED: "connected",
    ERROR: "error",
};

export const DATABASE_CONNECTION_SUCCESS_MESSAGE = (): string => {
    return `Połączono skutecznie z bazą danych MongoDB`;
};

export const DATABASE_CONNECTION_ERROR_MESSAGE = (error: Error): string => {
    return `Wystąpił problem z połączeniem do bazy danych MongoDB - ${error}`;
};

export const PORT_LISTENING_START_MESSAGE = (port: number): string => {
    return `Serwer działa na porcie ${port}`;
};
