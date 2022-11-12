import { IProductData } from "../interfaces/Product.interface";

export const serializeRespondedData = (product: any): IProductData => {
    const productData: IProductData = {
        Id: product._id,
        Name: product.Name,
        Price: product.Price,
        UpdateDate: product.UpdateDate,
    };

    console.log(productData);

    return productData;
};

export const serializeRespondedArray = (productsList: any): IProductData[] => {
    const productsDataArray = productsList.map((product: any) => {
        let productData: IProductData = {
            Id: product._id,
            Name: product.Name,
            Price: product.Price,
            UpdateDate: product.UpdateDate,
        };
        return productData;
    });

    console.log(productsDataArray);

    return productsDataArray;
};
