import type { Connection } from "mysql2/promise";
export interface review {
    review_id?: number;
    user_id: number;
    product_id: number;
    review_txt: string;
    review_stars: number;
}
export default class ReviewsModel {
    #private;
    /**
     * Gets all the reviews for a specific product
     * @param product_id number
     * @param db Database connection
     * @returns review array
     * @throws An error if there was a problem querying the db
     */
    static getProductReviews(product_id: number, db: Connection): Promise<review[]>;
    /**
     * Gets all the reviews made by a specific user
     * @param user_id number
     * @param db Database connection
     * @returns review array
     * @throws An error if there was a problem querying the db
     */
    static getUserReviews(user_id: number, db: Connection): Promise<review[]>;
    /**
     * Inserts product review into database and updates the product's rating automatically
     * NOTE: updateProductRating method is called inside this method, no need to call it after this one manually
     * @param review Obj { product_id: number, user_id: number, review_txt: string, review_stars: number }
     * @param db Database connection
     * @returns True if inserted, false if not
     * @throws An error if there was a problem querying the db
     */
    static insertReview(review: review, db: Connection): Promise<boolean>;
}
//# sourceMappingURL=reviews_model.d.ts.map