const { userInfo } = require("os");
const ErrorHander = require("../utils/errorhander");
const catchAsynError = require("./catchAsynError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsynError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHander("Vui lòng đăng nhập để truy cập!"), 401)
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
})
exports.authorieRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHander(`Role: ${req.user.role} không được phép truy cập! `), 403)
        }
        next();
    }
}

