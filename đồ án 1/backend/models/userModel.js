const mongooes = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongooes.Schema({
    name: {
        type: String,
        required: [true, "Vui lòng nhập tên của bạn!"],
        maxLength: [30, "Tên của bạn không vượt quá 30 ký tự"],
        minLength: [4, "Tên của bạn phải ít có 4 ký tự "]
    },
    email: {
        type: String,
        required: [true, "Vui lòng nhập Email của bạn!"],
        unique: true,
        validator: [validator.isEmail, "Vui lòng nhập Email hợp lệ!"]
    },
    password: {
        type: String,
        required: [true, "Vui lòng nhập Mật khẩu của bạn"],
        minLength: [8, "Mật khẩu của bạn phải ít nhất có 8 ký tự"],
        select: false,
    },
    avatar: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

})

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}
module.exports = mongooes.model("User", userSchema);