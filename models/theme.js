const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const themeSchema = new Schema({
	name: {
		type: String
	}
});

//fire a function before doc saved to database
themeSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	this.type = "user";
	next();
});
themeSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) return user;
		else throw Error("incorrecte password");
	}
	throw Error("incorrecte email");
};

const Theme = model("theme", themeSchema);

module.exports = Theme;
