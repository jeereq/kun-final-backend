const Theme = require("../models/theme");

//handle errors
const handleErrors = (error) => {
	let errs = {
		like: ""
	};

	//duplicate errors
	if (error.code === 11000) {
		errs.theme = "that id is already registered";
		return errs;
	}
	if (error.message.includes("like validation failed")) {
		//validation errors
		Object.values(error.errors).forEach(({ properties }) => {
			errs[properties.path] = properties.message;
		});
	}
};

module.exports = {
	theme_get: async (req, res) => {
		const allTheme = await Theme.show();
		res.status(200).json({ themes: allTheme });
	},
	theme_post: async (req, res) => {
		const { name } = req.body;
		try {
			const theme = new Theme({
				name
			});
			theme.save((err, NewTheme) => {
				if (err) {
					const errors = handleErrors(err);
					return res.status(400).json({ error: errors });
				}
				res.status(201).json({ _id: NewTheme._id });
			});
		} catch (err) {
			const errors = handleErrors(err);
			return res.status(400).json({ error: errors });
		}
	}
};
