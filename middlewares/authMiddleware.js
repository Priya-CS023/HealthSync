const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers["authorization"] ? req.headers["authorization"].split(" ")[1] : null;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "No token provided"
            });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Authentication failed"
                });
            } else {
                req.body.userId = decoded.id;
                next();
            }
        });
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Internal server error"
        });
    }
};
