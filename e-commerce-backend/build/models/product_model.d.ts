import type { RowDataPacket, Connection } from "mysql2/promise.js";
export default class ProductModel {
    static table_name: string;
    static getAllProducts(db: Connection): Promise<RowDataPacket[]>;
    static getProductById(product_id: number, db: Connection): Promise<RowDataPacket[]>;
}
//# sourceMappingURL=product_model.d.ts.map