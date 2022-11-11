export const CASE_UNAUTHORIZED_MESSAGE = (section: string): string => {
    return `Wystąpił problem z autoryzacją przy pobieraniu danych dla sekcji ${section}.`;
};

export const CASE_NOT_FOUND_MESSAGE = (section: string): string => {
    return `Nie znaleziono danych dla sekcji ${section}.`;
};

export const CASE_SUCCESS_MESSAGE = (section: string): string => {
    return `Dane dla sekcji ${section} zostały pomyślnie załadowane.`;
};

export const DATABASE_CONNECTION_SUCCESS_MESSAGE = (): string => {
    return `Połączono skutecznie z bazą danych MongoDB`;
};

export const DATABASE_CONNECTION_ERROR_MESSAGE = (error: Error): string => {
    return `Error: Could not connect to MongoDB - ${error}`;
};

export const PORT_LISTENING_START_MESSAGE = (port: number): string => {
    return `Serwer działa na porcie ${port}`;
};

export const ROOT_API_MESSAGE = (req: any, res: any) => {
    res.json({
        message: "Witamy w Shop App - API",
    });
};
