const jwt = require("jsonwebtoken");
const Restaurant = require("../models/restaurant");

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	//check json web token exist & is verified
	if (token) {
		jwt.verify(token, "jeereq", (err, decodeToken) => {
			console.log(decodeToken);
			if (err) res.json({ error: "vous n'etes pas autoriser a etre ici " });
			else next();
		});
	} else {
		res.json({ error: "vous n'etes pas autoriser a etre ici " });
	}
};
const requireAuthRestaurant = async (req, res, next) => {
	const token = req.cookies.jwt;
	//check json web token exist & is verified
	if (token) {
		jwt.verify(token, "jeereq", async (err, decodeToken) => {
			if (err) res.json({ error: "vous n'etes pas autoriser a etre ici " });
			else {
				const answer = await Restaurant.verifyId(decodeToken.id);
				if (answer.length === 0)
					res.json({ error: "vous n'etes pas autoriser a faire cette action	" });
				else next();
			}
		});
	} else {
		res.json({ error: "vous n'etes pas autoriser a etre ici " });
	}
};

module.exports = { requireAuth, requireAuthRestaurant };
