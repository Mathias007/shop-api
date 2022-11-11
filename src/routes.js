import express from "express";

import {
    getProductsList,
    getProductByID,
    addSingleProduct,
    addManyProducts,
    editProductByID,
    deleteProductByID,
} from "./controllers/products.controller";

import { ROOT_API_MESSAGE } from "./config/messages";

import routesPaths from "./config/routesPaths";
const { ROOT, PRODUCTS } = routesPaths;

const router = express.Router();

router.get(ROOT, ROOT_API_MESSAGE);
router.get(PRODUCTS.LIST, getProductsList);
router.post(PRODUCTS.SINGLE, getProductByID);
router.post(PRODUCTS.ADD, addSingleProduct);
router.post(PRODUCTS.ADD_MANY, addManyProducts);
router.patch(PRODUCTS.EDIT, editProductByID);
router.delete(PRODUCTS.REMOVE, deleteProductByID);

export default router;
