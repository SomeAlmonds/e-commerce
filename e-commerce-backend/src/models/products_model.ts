import type {
  RowDataPacket,
  Connection,
  ResultSetHeader,
} from "mysql2/promise.js";
import ReviewsModel from "./reviews_model.js";

export interface product {
  product_id?: number;
  product_name: string;
  product_quantity: number;
  product_category: string;
  product_price: number;
  product_rating_avg?: number;
  product_rating_count?: number;
}

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
  static async getAllProducts(limit: number, offset: number, db: Connection) {
    const query = `SELECT * FROM ${this.#table_name} LIMIT ? OFFSET ?`;

    try {
      const [rows] = await db.execute<RowDataPacket[]>(query, [limit, offset]);

      return rows as product[];
    } catch (err) {
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
  static async getFilteredPorducts(
    filters: {
      product_name?: string;
      product_category?: string;
      product_rating?: number;
      min_price?: number;
      max_price?: number;
    },
    offset: number,
    limit: number,
    db: Connection,
  ) {
    const values: any[] = [];
    const foo = {
      product_category: "=",
      product_rating: ">",
      min_price: ">=",
      max_price: "<=",
    };
    let query = `SELECT * FROM ${this.#table_name} WHERE `;

    Object.keys(filters).forEach((key, i) => {
      if (filters[key as keyof typeof filters]) {
        switch (key) {
          case "product_name":
            query += `product_name LIKE %?%`;
            values.push(filters.product_name);
            return;
          default:
            query += `${key} ${foo[key as keyof typeof foo]} ?`;
            values.push(filters[key as keyof typeof filters]);
        }

        if (i < this.length - 1) query += ` AND `;
      }
    });

    query += ` LIMIT ? OFFSET ?`;
    values.push(limit, offset);

    try {
      const [rows] = await db.execute<RowDataPacket[]>(query, values);

      return rows as product[];
    } catch (err) {
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
  static async getProductById(product_id: number, db: Connection) {
    const query = `SELECT * FROM ${this.#table_name} WHERE product_id = ?`;

    try {
      const [rows] = await db.execute<RowDataPacket[]>(query, [product_id]);

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
    const prod_reviews = await ReviewsModel.getProductReviews(product_id, db);

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
