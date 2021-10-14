const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	//check json web token exist & is verified
	if (token) {
		jwt.verify(token, "jeereq", (err, decodeToken) => {
			if (err) res.redirect("/login");
			else next();
		});
	} else {
		res.redirect("/login");
	}
};

module.exports = { requireAuth };
