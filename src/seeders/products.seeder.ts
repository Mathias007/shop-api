import { ProductSchema } from "../schemas/Product.schema";

async function isProductExisting() {
    const exec = await ProductSchema.find().exec();
    return (exec.length = 0);
}

export const initializeProductData = async () => {
    if (!(await isProductExisting())) {
        const product = [
            new ProductSchema({
                Name: "Produkt testowy",
                Price: 50,
                UpdateDate: new Date(),
            }),
        ];
        let done = 0;
        for (let i = 0; i < product.length; i++) {
            product[i].save((err, res) => {
                done++;
            });
        }
        console.log("Inicjalizacja produktu testowego");
    }
};
