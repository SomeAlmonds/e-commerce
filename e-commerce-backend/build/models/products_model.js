import ReviewsModel from "./reviews_model.js";
export default class ProductsModel {
    static #table_name = "products";
    /**
     * Gets a range of products with the provided offset
     * @param limit the number of products
     * @param offset the start index (e.g. offset 1 starts from the 2nd index)
     * @param db Database connection
     * @returns product array
     * @throws An error if there was a problem querying the db
     */
    static async getAllProducts(limit, offset, db) {
        const query = `SELECT * FROM ${this.#table_name} LIMIT ? OFFSET ?`;
        try {
            const [rows] = await db.query(query, [limit, offset]);
            return rows;
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Gets products based on the provieded filters
     * NOTE: the filters object keys should be named exactly the same as mentioned for the method to work
     * @param filters Obj {product_name: string, product_category: string, product_rating: number, min_price: number, max_price: number}
     * @param db Database connection
     * @returns product array
     */
    static async getFilteredPorducts(filters, offset, limit, db) {
        const values = [];
        const operators = {
            product_category: "=",
            product_rating: ">=",
            min_price: ">=",
            max_price: "<=",
        };
        let query = `SELECT * FROM ${this.#table_name} WHERE `;
        Object.keys(filters).forEach((key, i) => {
            if (filters[key]) {
                switch (key) {
                    case "product_name":
                        query += `product_name LIKE ?`;
                        values.push("%" + filters.product_name + "%");
                        break;
                    case "min_price":
                    case "max_price":
                        query += `product_price ${operators[key]} ?`;
                        values.push(filters[key]);
                        break;
                    case "product_rating":
                        query += `product_rating_avg ${operators[key]} ?`;
                        values.push(filters[key]);
                        break;
                    default:
                        query += `${key} ${operators[key]} ?`;
                        values.push(filters[key]);
                }
                if (i < this.length - 1)
                    query += ` AND `;
            }
        });
        query += ` LIMIT ? OFFSET ?`;
        values.push(limit, offset);
        try {
            const [rows] = await db.query(query, values);
            return rows;
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Gets a product from the database by its Id
     * @param product_id number
     * @param db Database connection
     * @returns A product obj.
     * @throws An error if there was a problem querying the db
     */
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
    /**
     * Updates the product rating avg. and number of reviews.
     * This method should be called AFTER inserting a new review or it will not have any effect
     * @param product_id number
     * @param db Database connection
     * @returns True if updated false if not
     * @throws An error if there was a problem querying the db
     */
    static async updateProductRating(product_id, db) {
        const prod_reviews = await ReviewsModel.getProductReviews(product_id, db);
        // get product reviews average
        const ratings = prod_reviews.map((rev) => Number(rev.review_stars));
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