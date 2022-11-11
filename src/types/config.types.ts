export type TCrudDNames = {
    PRODUCTS: string;
    LIST: string;
    SINGLE: string;
    ADD: string;
    ADD_MANY: string;
    EDIT: string;
    REMOVE: string;
};

export type TConfigVariables = {
    NODE_ENV: string;
    NODE_PORT: number;
    MONGO_URI: string;
    CORS_ORIGIN: string;
};

export type TServerStatuses = {
    UNAUTHORIZED: number;
    NOT_FOUND: number;
    CONFLICT: number;
};

export type TCollections = {
    products: string;
};

export type TDatabaseStatuses = {
    CONNECTED: string;
    ERROR: string;
};
