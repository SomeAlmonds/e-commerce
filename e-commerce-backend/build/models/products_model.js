import ReviewModel from "./reviews_model.js";
export default class ProductModel {
    static #table_name = "products";
    static async getAllProducts(db) {
        const query = `SELECT * FROM ${this.#table_name}`;
        try {
            const [rows] = await db.query(query);
            return rows;
        }
        catch (err) {
            throw err;
        }
    }
    static async getProductById(product_id, db) {
        const query = `SELECT * FROM ${this.#table_name} WHERE product_id = ?`;
        try {
            const [rows] = await db.execute(query, [product_id]);
            return rows[0];
        }
        catch (err) {
            throw err;
        }
    }
    static async getProductByName(product_name, db) {
        const query = `SELECT * FROM ${this.#table_name} WHERE product_name LIKE '%?%'`;
        try {
            const [rows] = await db.execute(query, [product_name]);
            return rows[0];
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Updates the product rating avg. and number of reviews.
     * This method should be called AFTER inserting a new review or it will not have any effect
     * @param product_id number
     * @param db Database connection
     * @returns True if updated false if not
     * @throws An error if there was a problem querying the db
     */
    static async updateProductRating(product_id, db) {
        const prod_reviews = await ReviewModel.getProductReviews(product_id, db);
        // get product reviews average
        const ratings = prod_reviews.map((rev) => rev.review_stars);
        const rating_avg = (ratings.reduce((a, b) => a + b) / ratings.length).toFixed(2);
        //
        const query = `UPDATE ${this.#table_name} SET product_rating_count = ?, ` +
            `product_rating_avg = ? WHERE product_id = ? ;`;
        try {
            const [rows] = await db.query(query, [
                prod_reviews.length,
                Number(rating_avg),
                product_id,
            ]);
            return rows.affectedRows ? true : false;
        }
        catch (err) {
            throw err;
        }
    }
}
//# sourceMappingURL=products_model.js.map