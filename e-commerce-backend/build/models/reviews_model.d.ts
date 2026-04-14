import type { Connection } from "mysql2/promise";
export interface review {
    review_id?: number;
    user_id: number;
    product_id: number;
    review_txt: string;
    review_stars: number;
}
export default class ReviewModel {
    #private;
    static getProductReviews(product_id: number, db: Connection): Promise<review[]>;
    static getUserReviews(user_id: number, db: Connection): Promise<review[]>;
    /**
     * Inserts product review into database and updates the product's rating automatically
     * NOTE: updateProductRating method is called inside this method, no need to call it after this one manually
     * @param review Obj { product_id: number, user_id: number, review_txt: string, review_stars: number }
     * @param db Database connection
     * @returns True if inserted, false if not
     */
    static insertReview(review: review, db: Connection): Promise<boolean>;
}
//# sourceMappingURL=reviews_model.d.ts.map