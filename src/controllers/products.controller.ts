import { Request, Response } from "express";
import mongoose from "mongoose";

import { ProductSchema } from "../schemas/Product.schema";
import { IProductDataUnstructurized } from "../interfaces/Product.interface";
import {
    serializeRespondedData,
    serializeRespondedArray,
} from "../helpers/products.helpers";

import statuses from "../config/statuses";

import { NextFunction } from "express";

const { BAD_REQUEST, UNAUTHORIZED, NOT_FOUND } = statuses;

export const getMainApiMessage = (req: Error, res: Response) => {
    res.json({
        message: "Shop App: Produkty (API)",
    });
};

export const getProductsList = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const messages = {
        CASE_UNAUTHORIZED_MESSAGE: "Wystąpił problem z autoryzacją!",
        CASE_NOT_FOUND_MESSAGE: "Nie znaleziono listy produktów!",
        CASE_SUCCESS_MESSAGE:
            "Wyszukiwanie listy produktów zakończyło się powodzeniem.",
    };

    const {
        CASE_UNAUTHORIZED_MESSAGE,
        CASE_NOT_FOUND_MESSAGE,
        CASE_SUCCESS_MESSAGE,
    } = messages;

    ProductSchema.find((err: Error, productsData: IProductDataUnstructurized[]) => {
        if (err || !productsData) {
            res.status(UNAUTHORIZED).send({
                message: CASE_UNAUTHORIZED_MESSAGE,
            });
            next(err);
        } else if (!productsData) {
            res.status(NOT_FOUND).send({
                message: CASE_NOT_FOUND_MESSAGE,
            });
        } else {
            res.json({
                message: CASE_SUCCESS_MESSAGE,
                productsData: serializeRespondedArray(productsData),
            });
        }
    });
};

export const getProductByID = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const messages = {
        CASE_BAD_REQUEST_ID_MESSAGE:
            "Błędne żądanie - nie wysłano identyfikatora poszukiwanego produktu!",
        CASE_UNAUTHORIZED_MESSAGE: "Wystąpił problem z autoryzacją!",
        CASE_NOT_FOUND_MESSAGE:
            "Nie znaleziono produktu o podanym identyfikatorze!",
        CASE_SUCCESS_MESSAGE:
            "Wyszukiwanie produktu zakończyło się powodzeniem.",
    };

    const {
        CASE_BAD_REQUEST_ID_MESSAGE,
        CASE_UNAUTHORIZED_MESSAGE,
        CASE_NOT_FOUND_MESSAGE,
        CASE_SUCCESS_MESSAGE,
    } = messages;

    if (!req.body.id) {
        res.status(BAD_REQUEST).send({
            message: CASE_BAD_REQUEST_ID_MESSAGE,
        });
    } else {
        let productID = mongoose.Types.ObjectId(req.body.id);

        ProductSchema.findOne(
            { _id: productID },
            (err: Error, product: Response) => {
                if (err) {
                    res.status(UNAUTHORIZED).send({
                        message: CASE_UNAUTHORIZED_MESSAGE,
                    });
                    next(err);
                } else if (!product) {
                    res.status(NOT_FOUND).send({
                        message: CASE_NOT_FOUND_MESSAGE,
                    });
                } else {
                    res.json({
                        message: CASE_SUCCESS_MESSAGE,
                        foundProduct: serializeRespondedData(product),
                    });
                }
            }
        );
    }
};

export const addSingleProduct = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const messages = {
        CASE_BAD_REQUEST_NON_DATA_MESSAGE:
            "Błędne żądanie - produkt musi mieć nazwę, cenę. Niepodanie daty poskutkuje automatycznym dodaniem aktualnej daty, natomiast pozostałe informacje muszą zostać wysłane przez użytkownika",
        CASE_BAD_REQUEST_VALIDATION_NAME_MESSAGE:
            "Błędne żądanie - nazwa produktu może mieć maksymalnie 100 znaków!",
        CASE_SUCCESS_MESSAGE: "Produkt został skutecznie dodany!",
        CASE_UNAUTHORIZED_MESSAGE: "Wystąpił problem z autoryzacją!",
    };

    const {
        CASE_BAD_REQUEST_NON_DATA_MESSAGE,
        CASE_BAD_REQUEST_VALIDATION_NAME_MESSAGE,
        CASE_UNAUTHORIZED_MESSAGE,
        CASE_SUCCESS_MESSAGE,
    } = messages;

    if (!req.body.name || !req.body.price) {
        res.status(BAD_REQUEST).send({
            message: CASE_BAD_REQUEST_NON_DATA_MESSAGE,
        });
    } else if (req.body.name.length > 100) {
        res.status(BAD_REQUEST).send({
            message: CASE_BAD_REQUEST_VALIDATION_NAME_MESSAGE,
        });
    } else {
        ProductSchema.create(
            {
                Name: req.body.name,
                Price: req.body.price,
                UpdateDate: req.body.date,
            },
            (err: Error, product: any) => {
                if (err) {
                    res.status(UNAUTHORIZED).send({
                        message: CASE_UNAUTHORIZED_MESSAGE,
                    });
                    next(err);
                } else {
                    res.json({
                        message: CASE_SUCCESS_MESSAGE,
                        addedProduct: serializeRespondedData(product),
                    });
                }
            }
        );
    }
};

export const editProductByID = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const messages = {
        CASE_BAD_REQUEST_ID_MESSAGE:
            "Błędne żądanie - nie wysłano identyfikatora modyfikowanego produktu!",
        CASE_BAD_REQUEST_NON_DATA_MESSAGE:
            "Błędne żądanie - produkt musi mieć nazwę, cenę. Niepodanie daty poskutkuje automatycznym dodaniem aktualnej daty, natomiast pozostałe informacje muszą zostać wysłane przez użytkownika",
        CASE_BAD_REQUEST_VALIDATION_NAME_MESSAGE:
            "Błędne żądanie - nazwa produktu może mieć maksymalnie 100 znaków!",
        CASE_UNAUTHORIZED_MESSAGE:
            "Wystąpił problem z autoryzacją podczas modyfikacji danych produktu!",
        CASE_NOT_FOUND_MESSAGE:
            "Nie znaleziono produktu o wybranym identyfikatorze!",
        CASE_SUCCESS_MESSAGE: "Dane produktu zostały zmodyfikowane!",
    };

    const {
        CASE_BAD_REQUEST_ID_MESSAGE,
        CASE_BAD_REQUEST_NON_DATA_MESSAGE,
        CASE_BAD_REQUEST_VALIDATION_NAME_MESSAGE,
        CASE_UNAUTHORIZED_MESSAGE,
        CASE_NOT_FOUND_MESSAGE,
        CASE_SUCCESS_MESSAGE,
    } = messages;

    if (!req.body.id) {
        res.status(BAD_REQUEST).send({
            message: CASE_BAD_REQUEST_ID_MESSAGE,
        });
    } else if (!req.body.name || !req.body.price) {
        res.status(BAD_REQUEST).send({
            message: CASE_BAD_REQUEST_NON_DATA_MESSAGE,
        });
    } else if (req.body.name && req.body.name.length > 100) {
        res.status(BAD_REQUEST).send({
            message: CASE_BAD_REQUEST_VALIDATION_NAME_MESSAGE,
        });
    } else {
        let productID = mongoose.Types.ObjectId(req.body.id);

        ProductSchema.findOneAndUpdate(
            { _id: productID },
            {
                Name: req.body.name,
                Price: req.body.price,
                UpdateDate: req.body.date || new Date(),
            },
            {},
            (err: Error, product: any) => {
                if (err) {
                    res.status(UNAUTHORIZED).send({
                        message: CASE_UNAUTHORIZED_MESSAGE,
                    });
                    next(err);
                } else if (!product) {
                    res.status(NOT_FOUND).send({
                        message: CASE_NOT_FOUND_MESSAGE,
                    });
                } else {
                    res.json({
                        message: CASE_SUCCESS_MESSAGE,
                        editedProduct: serializeRespondedData(product),
                    });
                }
            }
        );
    }
};

export const deleteProductByID = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const messages = {
        CASE_BAD_REQUEST_ID_MESSAGE:
            "Błędne żądanie - nie wysłano identyfikatora modyfikowanego produktu!",
        CASE_UNAUTHORIZED_MESSAGE:
            "Wystąpił problem z autoryzacją podczas usuwania danych produktu!",
        CASE_NOT_FOUND_MESSAGE: "Nie ma produktu o wybranym identyfikatorze!",
        CASE_SUCCESS_MESSAGE: "Wybrany produkt został usunięty!",
    };

    const {
        CASE_BAD_REQUEST_ID_MESSAGE,
        CASE_UNAUTHORIZED_MESSAGE,
        CASE_NOT_FOUND_MESSAGE,
        CASE_SUCCESS_MESSAGE,
    } = messages;

    if (!req.body.id) {
        res.status(BAD_REQUEST).send({
            message: CASE_BAD_REQUEST_ID_MESSAGE,
        });
    } else {
        let productID = mongoose.Types.ObjectId(req.body.id);

        ProductSchema.findOneAndDelete(
            { _id: productID },
            {},
            (err: Error, product: any) => {
                if (err) {
                    res.status(UNAUTHORIZED).send({
                        message: CASE_UNAUTHORIZED_MESSAGE,
                    });
                    next(err);
                } else if (!product) {
                    res.status(NOT_FOUND).send({
                        message: CASE_NOT_FOUND_MESSAGE,
                    });
                } else {
                    res.json({
                        message: CASE_SUCCESS_MESSAGE,
                        deletedProduct: serializeRespondedData(product),
                    });
                }
            }
        );
    }
};
