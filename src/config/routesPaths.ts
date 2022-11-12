import addressFragments from "./addressFragments";
import { TCrudDNames } from "../types/config.types";

const {
    PRODUCTS,
    ADD,
    EDIT,
    LIST,
    REMOVE,
    SINGLE,
} = addressFragments;

const routesPaths: {
    ROOT: string;
    PRODUCTS: TCrudDNames;
} = {
    ROOT: "/",
    PRODUCTS: {
        PRODUCTS: `/${PRODUCTS}`,
        LIST: `/${PRODUCTS}/${LIST}`,
        SINGLE: `/${PRODUCTS}/${SINGLE}`,
        ADD: `/${PRODUCTS}/${ADD}`,
        EDIT: `/${PRODUCTS}/${EDIT}`,
        REMOVE: `/${PRODUCTS}/${REMOVE}`,
    },
};

export default routesPaths;
