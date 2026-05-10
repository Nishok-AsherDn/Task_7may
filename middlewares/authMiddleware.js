const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

    try {

        // get token from header
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // store user data in request
        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};