import mongoose from "mongoose";

import { collections } from "../config/names.js";

const Schema = mongoose.Schema;

const Product = new Schema(
    {
        Name: {
            type: String,
            trim: true,
            required: true,
        },
        Price: {
            type: String,
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

export const ProductSchema = mongoose.model(
    collections.products,
    Product,
    collections.products
);
