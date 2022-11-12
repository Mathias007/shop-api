import mongoose, { Schema, model } from "mongoose";

import { collections } from "../config/database";

import { IProduct } from "../interfaces/Product.interface";

const Product = new Schema<IProduct>(
    {
        Name: {
            type: String,
            trim: true,
            required: true,
            max: 100,
        },
        Price: {
            type: Number,
            trim: true,
            required: true,
        },
        UpdateDate: {
            type: Date,
            default: new Date(),
        },
    },
    {
        versionKey: false,
    }
);

export const ProductSchema = model<IProduct>(
    collections.products,
    Product,
    collections.products
);
