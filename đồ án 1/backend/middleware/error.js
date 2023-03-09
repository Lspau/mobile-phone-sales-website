const ErrorHander = require("../utils/errorhander")

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Sever Error";


    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHander(message, 400)
    }

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keyValue} Entered`;
        err = new ErrorHander(message, 400)
    }
    if (err.code === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again`;
        err = new ErrorHander(message, 400)
    }
    if (err.code === "TokenExpiriedError") {
        const message = `Json Web Token is invalid, Try again`;
        err = new ErrorHander(message, 400)
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
} 