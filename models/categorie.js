const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const categorieSchema = new Schema({
	name: {
		type: String
	}
});

//fire a function before doc saved to database

categorieSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	this.type = "user";
	next();
});

categorieSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) return user;
		else throw Error("incorrecte password");
	}
	throw Error("incorrecte email");
};

const Categorie = model("categorie", categorieSchema);

module.exports = Categorie;
