const { verifyJwt } = require("../utils/jwt.js");

const auth = async (req, res, next) => {
    try {
        const token =  (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));
        console.log("Here");
        console.log(req.headers.authorization);

        if (!token) {
            return res.status(401).json({ success: false, message: `Token Missing` });
        }

        const decoded = await verifyJwt(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: "Token is invalid" });
        } else {
            return res.status(401).json({ success: false, message: `Something went wrong while validating the token` });
        }
    }
};

module.exports = { auth };
