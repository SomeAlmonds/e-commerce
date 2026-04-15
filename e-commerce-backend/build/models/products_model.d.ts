import type { Connection } from "mysql2/promise.js";
export interface product {
    product_id?: number;
    product_name: string;
    product_quantity: number;
    product_category: string;
    product_price: number;
    product_rating_avg?: number;
    product_rating_count?: number;
}
export default class ProductModel {
    #private;
    /**
     * Gets a range of products with the provided offset
     * @param limit the number of products
     * @param offset the start index (e.g. offset 1 starts from the 2nd index)
     * @param db Database connection
     * @returns product array
     * @throws An error if there was a problem querying the db
     */
    static getAllProducts(limit: number, offset: number, db: Connection): Promise<product[]>;
    /**
     * Search for product names that contain a match for the provided string.
     * @param product_name string
     * @param db Database connection
     * @returns product array
     * @throws An error if there was a problem querying the db
     */
    static getProductsByName(product_name: string, db: Connection): Promise<product[]>;
    /**
     * Gets products based on the provieded filters
     * NOTE: the filters object keys should be named exactly the same as mentioned for the method to work
     * @param filters Obj {product_category: string, product_rating: number, min_price: number, max_price: number}
     * @param db Database connection
     * @returns product array
     */
    static getFilteredPorducts(filters: {
        product_category?: string;
        product_rating?: number;
        min_price?: number;
        max_price?: number;
    }, db: Connection): Promise<product[]>;
    /**
     * Gets products based on their category.
     * @param product_category string
     * @param db Database connection
     * @returns product array
     * @throws An error if there was a problem querying the db
     */
    static getProductsByCategory(product_category: string, db: Connection): Promise<product[]>;
    /**
     * Gets a product from the database by its Id
     * @param product_id number
     * @param db Database connection
     * @returns A product obj.
     * @throws An error if there was a problem querying the db
     */
    static getProductById(product_id: number, db: Connection): Promise<product>;
    /**
     * Updates the product rating avg. and number of reviews.
     * This method should be called AFTER inserting a new review or it will not have any effect
     * @param product_id number
     * @param db Database connection
     * @returns True if updated false if not
     * @throws An error if there was a problem querying the db
     */
    static updateProductRating(product_id: number, db: Connection): Promise<boolean>;
}
//# sourceMappingURL=products_model.d.ts.map