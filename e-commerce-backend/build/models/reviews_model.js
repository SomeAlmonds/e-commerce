import ProductsModel from "./products_model.js";
export default class ReviewsModel {
    static #table_name = "reviews";
    /**
     * Gets all the reviews for a specific product
     * @param product_id number
     * @param db Database connection
     * @returns review array
     * @throws An error if there was a problem querying the db
     */
    static async getProductReviews(product_id, db) {
        const query = `SELECT * FROM ${this.#table_name} WHERE product_id = ?`;
        try {
            const [rows] = await db.execute(query, [product_id]);
            return rows;
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Gets all the reviews made by a specific user
     * @param user_id number
     * @param db Database connection
     * @returns review array
     * @throws An error if there was a problem querying the db
     */
    static async getUserReviews(user_id, db) {
        const query = `SELECT * FROM ${this.#table_name} WHERE user_id = ?`;
        try {
            const [rows] = await db.execute(query, [user_id]);
            return rows;
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Inserts product review into database and updates the product's rating automatically
     * NOTE: updateProductRating method is called inside this method, no need to call it after this one manually
     * @param review Obj { product_id: number, user_id: number, review_txt: string, review_stars: number }
     * @param db Database connection
     * @returns True if inserted, false if not
     * @throws An error if there was a problem querying the db
     */
    static async insertReview(review, db) {
        const query = `INSERT INTO ${this.#table_name} (product_id, user_id, review_txt, review_stars, review_date) ` +
            `VALUES (?)`;
        try {
            const [rows] = await db.query(query, [
                Object.values(review),
            ]);
            if (rows.affectedRows) {
                try {
                    await ProductsModel.updateProductRating(review.product_id, db);
                    return true;
                }
                catch (err) {
                    throw err;
                }
            }
            else {
                return false;
            }
        }
        catch (err) {
            throw err;
        }
    }
}
//# sourceMappingURL=reviews_model.js.map