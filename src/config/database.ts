import { TCollections, TDatabaseStatuses } from "../types/config.types";

export const collections: TCollections = {
    products: "products",
};

export const mongoStatuses: TDatabaseStatuses = {
    CONNECTED: "connected",
    ERROR: "error",
};
