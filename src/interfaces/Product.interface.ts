export interface IProduct {
    Name: string;
    Price: Number;
    UpdateDate: Date;
}

export interface IProductData extends IProduct {
    Id: string;
}

export interface IProductDataUnstructurized extends IProduct {
    _id: string;
}
