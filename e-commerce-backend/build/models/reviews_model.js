import ProductModel from "./products_model.js";
export default class ReviewModel {
    static #table_name = "reviews";
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
     */
    static async insertReview(review, db) {
        const query = `INSERT INTO ${this.#table_name} (product_id, user_id, review_txt, review_stars) ` +
            `VALUES ?`;
        try {
            const [rows] = await db.execute(query, [
                Object.values(review),
            ]);
            if (rows.affectedRows) {
                try {
                    await ProductModel.updateProductRating(review.product_id, db);
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