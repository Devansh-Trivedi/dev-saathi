const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({
            error: true,
            message: "Please Login to continue.",
        });
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(
        token,
        process.env.JWT_SECRET || "SECRET_KEY",
        async (err, payload) => {
            if (err) {
                return res.status(401).send({
                    error: true,
                    message: "Please Login to continue.",
                });
            }
            const { userId } = payload;
            const user = await User.findById(userId, {
                password: 0,
                __v: 0,
            });
            req.user = user;
            next();
        }
    );
};