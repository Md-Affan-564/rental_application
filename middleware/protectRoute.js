const jwt = require('jsonwebtoken')

function protectRoute(req, res, next) {
    if (!req.cookies || !req.cookies.token) {
        return res.redirect("/login");
    }

    try {
        const data = jwt.verify(req.cookies.token, "shhhh");
        req.user = data;
        next();
    } catch (err) {
        return res.redirect("/login");
    }
}
module.exports = protectRoute