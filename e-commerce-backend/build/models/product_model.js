export default class ProductModel {
    static table_name = "products";
    static async getAllProducts(db) {
        const query = `SELECT * FROM ${this.table_name}`;
        try {
            const [rows] = await db.query(query);
            return rows;
        }
        catch (err) {
            throw err;
        }
    }
    static async getProductById(product_id, db) {
        const query = `SELECT * FROM ${this.table_name} WHERE product_id = ?`;
        try {
            const [rows] = await db.execute(query, [product_id]);
            return rows;
        }
        catch (err) {
            throw err;
        }
    }
}
//# sourceMappingURL=product_model.js.map