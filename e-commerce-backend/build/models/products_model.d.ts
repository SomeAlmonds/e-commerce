import type { Connection } from "mysql2/promise.js";
export interface product {
    product_id: number;
    product_name: string;
    product_quantity: number;
    product_category: string;
    product_rating_avg?: number;
    product_rating_count?: number;
}
export default class ProductModel {
    #private;
    static getAllProducts(db: Connection): Promise<product[]>;
    static getProductById(product_id: number, db: Connection): Promise<product>;
    static getProductByName(product_name: string, db: Connection): Promise<product>;
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