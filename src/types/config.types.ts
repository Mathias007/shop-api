export type TCrudDNames = {
    PRODUCTS: string;
    LIST: string;
    SINGLE: string;
    ADD: string;
    EDIT: string;
    REMOVE: string;
};

export type TConfigVariables = {
    NODE_ENV: string;
    NODE_PORT: number;
    NODE_HOST: string;
    MONGO_URI: string;
    CORS_ORIGIN: string;
};

export type TServerStatuses = {
    BAD_REQUEST: number;
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
