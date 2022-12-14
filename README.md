# Shop API.

## I. About the app.
Design of a **backend** web application for product data management. At the current stage, basic queries (`CRUD`) are available as part of the `REST API`:
- List of products (`GET`),
- Product details - selection by entering its **identifier (Id)** (`POST`),
- Adding a new product (`POST`),
- Product data update - selection by entering its **identifier (Id)** (`PUT`),
- Deleting a product - selection by entering its **identifier (Id)** (`DELETE`).

The project uses `NodeJS` in the `ExpressJS` framework, while also using `TypeScript`. The data is stored in the non-relational database `MongoDB`.

The author of the solution is **Mateusz Stawowski**. An important assumption of the creator, apart from the creative and rational use of available libraries and tools to build a fully-fledged fullstack application, is its compliance with good practices of modern programming.

## II. Installation and commissioning (proposal).
After downloading/cloning the repository locally, the following operations should be considered. The first step is to install dependencies from `package.json`. From the main project folder in the terminal, we execute the following commands:
```sh
npm install
npm run start
```
The second issue is the use of **environment variables** in the project. Their content has been hidden from Github for security reasons. Therefore, before starting, it will be necessary to create `.env` files locally and include them in the variables listed in `configVariables.js` files. **For the purposes of verification of the recruitment task, default data have already been defined in this file**.

Thirdly, the application works with the `MongoDB` database. Therefore, you should take care of connecting to a database of this type with a collection called `products`, but if it is not empty, it is absolutely necessary to adhere to the following single record scheme:

        {
            Name: string (mandatory field, maximum 100 characters),
            Price: number (mandatory field),
            UpdateDate: date (if the date is not provided by the user, the date from the moment of query execution will be assigned),
        }
**In the assumptions of the task, the entity also includes its Id. However, this element does not need to be defined by the user, because the application uses the _id value provided by the MongoDB environment for this purpose.**

## III. Application content - `CRUD` type operations.
### 0. Section home page (`GET`).
    - path: {host_address}/products
    - query body: none
    - expected response (for status 200): welcome message
### 1. List of products (`GET`).
    - path: {host_address}/products/list
    - query body: none
    - expected response (for status 200): structured array of objects containing product data (productsData)
### 2. Product details (`POST`).
    - path: {host_address}/products/single
    - sample query body:
        {
            "id": "636e7698a1ae6e05048e2525"
        }
    - expected response (for status 200): searched product data (foundProduct)
### 3. Adding a new product (`POST`).
    - path: {host_address}/products/add
    - sample query body:
        {
            "name":"Test",
            "price":"200",
            "date": "2022-11-11T17:12:21.678+00:00"
        }
    - expected response (for status 200): searched product data (foundProduct)
### 4. Product data update (`PUT`).
    - path: {host_address}/products/edit
    - sample query body:
        {
            "id": "636e7698a1ae6e05048e2525",
            "name": "Test",
            "price": 5000
        }
    - expected response (for status 200): modified product data (editedProduct)
### 5. Deleting a product (`DELETE`).
    - path: {host_address}/products/remove
    - sample query body:
        {
            "id": "636e7698a1ae6e05048e2525"
        }
    - expected response (for status 200): details of the deleted product (deletedProduct)