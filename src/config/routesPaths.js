import addressFragments from "./addressFragments.js";

const {
    PRODUCTS,
    ADD,
    ADD_MANY,
    EDIT,
    LIST,
    REMOVE,
    SINGLE,
} = addressFragments;

const routesPaths = {
    ROOT: "/",
    PRODUCTS: {
        LIST: `/${PRODUCTS}/${LIST}`,
        SINGLE: `/${PRODUCTS}/${SINGLE}`,
        ADD: `/${PRODUCTS}/${ADD}`,
        ADD_MANY: `/${PRODUCTS}/${ADD_MANY}`,
        EDIT: `/${PRODUCTS}/${EDIT}`,
        REMOVE: `/${PRODUCTS}/${REMOVE}`,
    },
};

export default routesPaths;
