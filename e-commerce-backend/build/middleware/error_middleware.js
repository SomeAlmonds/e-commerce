export default function errorHandler(err, req, res, next) {
    err.status_code = err.status_code || 500;
    err.status = err.status || "fail";
    if (process.env.NODE_ENV === "dev") {
        res.status(err.status_code).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err,
        });
    }
    else {
        if (err.is_operational) {
            res.status(err.status_code).json({
                status: err.status,
                message: err.message,
            });
        }
        else {
            console.error("UNEXPECTED ERROR: ", err);
            res.status(500).send("somthing went wrong");
        }
    }
}
//# sourceMappingURL=error_middleware.js.map