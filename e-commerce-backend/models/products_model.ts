import type {
  RowDataPacket,
  Connection,
  ResultSetHeader,
} from "mysql2/promise.js";
import type { review } from "./reviews_model.js";
import ReviewModel from "./reviews_model.js";

export interface product {
  product_id: number;
  product_name: string;
  product_quantity: number;
  product_category: string;
  product_rating_avg?: number;
  product_rating_count?: number;
}

export default class ProductModel {
  static #table_name = "products";

  static async getAllProducts(db: Connection) {
    const query = `SELECT * FROM ${this.#table_name}`;

    try {
      const [rows] = await db.query<RowDataPacket[]>(query);

      return rows as product[];
    } catch (err) {
      throw err;
    }
  }

  static async getProductById(product_id: number, db: Connection) {
    const query = `SELECT * FROM ${this.#table_name} WHERE product_id = ?`;

    try {
      const [rows] = await db.execute<RowDataPacket[]>(query, [product_id]);

      return rows[0] as product;
    } catch (err) {
      throw err;
    }
  }

  static async getProductByName(product_name: string, db: Connection) {
    const query = `SELECT * FROM ${this.#table_name} WHERE product_name LIKE '%?%'`;

    try {
      const [rows] = await db.execute<RowDataPacket[]>(query, [product_name]);

      return rows[0] as product;
    } catch (err) {
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
  static async updateProductRating(product_id: number, db: Connection) {
    const prod_reviews = await ReviewModel.getProductReviews(product_id, db);

    // get product reviews average
    const ratings = prod_reviews.map((rev) => rev.review_stars);
    const rating_avg = (
      ratings.reduce((a, b) => a + b) / ratings.length
    ).toFixed(2);
    //

    const query =
      `UPDATE ${this.#table_name} SET product_rating_count = ?, ` +
      `product_rating_avg = ? WHERE product_id = ? ;`;

    try {
      const [rows] = await db.query<ResultSetHeader>(query, [
        prod_reviews.length,
        Number(rating_avg),
        product_id,
      ]);

      return rows.affectedRows ? true : false;
    } catch (err) {
      throw err;
    }
  }
}
