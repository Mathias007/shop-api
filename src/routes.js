import express from "express";

import {
    getMainApiMessage,
    getProductsList,
    getProductByID,
    addSingleProduct,
    editProductByID,
    deleteProductByID,
} from "./controllers/products.controller";

import routesPaths from "./config/routesPaths";
const { PRODUCTS } = routesPaths;

const router = express.Router();

router.get(PRODUCTS.PRODUCTS, getMainApiMessage);
router.get(PRODUCTS.LIST, getProductsList);
router.post(PRODUCTS.SINGLE, getProductByID);
router.post(PRODUCTS.ADD, addSingleProduct);
router.put(PRODUCTS.EDIT, editProductByID);
router.delete(PRODUCTS.REMOVE, deleteProductByID);

export default router;
