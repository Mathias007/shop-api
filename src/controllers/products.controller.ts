import { Request, Response } from "express";
import mongoose, { Query } from "mongoose";

import { ProductSchema } from "../schemas/Product.schema";

import statuses from "../config/statuses";

import {
    CASE_UNAUTHORIZED_MESSAGE,
    CASE_NOT_FOUND_MESSAGE,
    CASE_SUCCESS_MESSAGE,
} from "../config/messages";
import { NextFunction } from "express";

const { UNAUTHORIZED, NOT_FOUND, CONFLICT } = statuses;

export const getProductsList = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // @ts-ignore
    ProductSchema.find({}, {}, (err: any, productsData: any) => {
        if (err || !productsData) {
            res.status(UNAUTHORIZED).send({
                message: CASE_UNAUTHORIZED_MESSAGE("PRODUCTS"),
            });
            next(err);
        } else if (!productsData) {
            res.status(NOT_FOUND).send({
                message: CASE_NOT_FOUND_MESSAGE("PRODUCTS"),
            });
        } else {
            res.json({
                message: CASE_SUCCESS_MESSAGE("PRODUCTS"),
                productsData,
            });
            console.log(productsData);
        }
    });
};

export const getProductByID = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const messages = {
        CASE_UNAUTHORIZED_MESSAGE: "Wystąpił problem z autoryzacją!",
        CASE_NOT_FOUND_MESSAGE:
            "Nie znaleziono produktu o podanym identyfikatorze!",
        CASE_SUCCESS_MESSAGE:
            "Wyszukiwanie produktu zakończyło się powodzeniem.",
    };

    const {
        CASE_UNAUTHORIZED_MESSAGE,
        CASE_NOT_FOUND_MESSAGE,
        CASE_SUCCESS_MESSAGE,
    } = messages;

    let productID = mongoose.Types.ObjectId(req.body.id);

    ProductSchema.findOne({ _id: productID }, (err: any, product: any) => {
        if (err) {
            res.status(UNAUTHORIZED).send({
                message: CASE_UNAUTHORIZED_MESSAGE,
            });
            next(err);
        } else if (!product) {
            res.status(NOT_FOUND).send({ message: CASE_NOT_FOUND_MESSAGE });
        } else {
            console.log(product);
            res.json({
                message: CASE_SUCCESS_MESSAGE,
                product,
            });
        }
    });
};

export const addSingleProduct = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const messages = {
        CASE_SUCCESS_MESSAGE: "Produkt został skutecznie dodany!",
        CASE_CONFLICT_MESSAGE:
            "Żądanie nie może zostać wykonane z powodu zaistnienia konfliktu!",
    };

    const { CASE_CONFLICT_MESSAGE, CASE_SUCCESS_MESSAGE } = messages;

    ProductSchema.create(
        {
            Name: req.body.name,
            Price: req.body.price,
            UpdateDate: req.body.date,
        },
        (error, result) => {
            if (error) next(error);
            else
                res.json({
                    message: CASE_SUCCESS_MESSAGE,
                });
        }
    );
};

export const addManyProducts = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const messages = {
        CASE_SUCCESS_MESSAGE:
            "Zestaw produktów został skutecznie umieszczony w bazie!",
        CASE_CONFLICT_MESSAGE:
            "Żądanie nie może zostać wykonane z powodu zaistnienia konfliktu!",
    };

    const { CASE_CONFLICT_MESSAGE, CASE_SUCCESS_MESSAGE } = messages;

    console.log(req.body.productsArray);

    ProductSchema.insertMany(req.body.productsArray)
        .then(() => res.json({ message: CASE_SUCCESS_MESSAGE }))
        .catch((error) => next(error));
};

export const editProductByID = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const messages = {
        CASE_UNAUTHORIZED_MESSAGE:
            "Wystąpił problem z autoryzacją podczas modyfikacji danych produktu!",
        CASE_NOT_FOUND_MESSAGE:
            "Nie znaleziono produktu o wybranym identyfikatorze!",
        CASE_SUCCESS_MESSAGE: "Dane produktu zostały zmodyfikowane!",
    };

    const {
        CASE_UNAUTHORIZED_MESSAGE,
        CASE_NOT_FOUND_MESSAGE,
        CASE_SUCCESS_MESSAGE,
    } = messages;

    let productID = mongoose.Types.ObjectId(req.body.id);

    ProductSchema.updateOne(
        { _id: productID },
        {
            $set: req.body,
        },
        // @ts-ignore
        (err, product) => {
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
                console.log(product);
                res.json({ message: CASE_SUCCESS_MESSAGE, product });
            }
        }
    );
};

export const deleteProductByID = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const messages = {
        CASE_UNAUTHORIZED_MESSAGE:
            "Wystąpił problem z autoryzacją podczas usuwania danych produktu!",
        CASE_NOT_FOUND_MESSAGE: "Nie ma produktu o wybranym identyfikatorze!",
        CASE_SUCCESS_MESSAGE: "Wybrany produkt został usunięty!",
    };

    const {
        CASE_UNAUTHORIZED_MESSAGE,
        CASE_NOT_FOUND_MESSAGE,
        CASE_SUCCESS_MESSAGE,
    } = messages;

    let productID = mongoose.Types.ObjectId(req.body.id);

    // @ts-ignore
    ProductSchema.deleteOne({ _id: productID }, (err, product) => {
        if (err) {
            res.status(UNAUTHORIZED).send({
                message: CASE_UNAUTHORIZED_MESSAGE,
            });
            next(err);
        } else if (!product.deletedCount) {
            res.status(NOT_FOUND).send({
                message: CASE_NOT_FOUND_MESSAGE,
            });
        } else {
            console.log(product);
            res.json({ message: CASE_SUCCESS_MESSAGE });
        }
    });
};
