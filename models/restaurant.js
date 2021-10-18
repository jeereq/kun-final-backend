const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const restaurantSchema = new Schema({
	name: {
		type: String,
		minlength: [2, "Minimum name length is 2 charachters"],
		required: [true, "please enter an name"]
	},
	localisation: {
		type: String,
		minlength: [2, "Minimum localisation length is 2 charachters"],
		required: [true, "please enter an localisation"]
	},
	profileImage: {
		type: String,
		minlength: [2, "Minimum profileImage length is 2 charachters"],
		required: [true, "please enter an profileImage"]
	},
	localisationMaps: [
		{
			type: String,
			minlength: [2, "Minimum localisation length is 2 charachters"]
		}
	],
	images: [
		{
			type: String,
			minlength: [2, "Minimum images length is 2 charachters"]
		}
	],
	plats: [
		{
			type: String,
			minlength: [2, "Minimum plats length is 2 charachters"]
		}
	],
	themes: [
		{
			type: String,
			minlength: [2, "Minimum themes length is 2 charachters"]
		}
	],
	categories: [
		{
			type: String,
			minlength: [2, "Minimum categories length is 2 charachters"]
		}
	],
	email: {
		type: String,
		required: [true, "please enter an email"],
		unique: true,
		lowercase: true,
		validate: [isEmail, "please enter a valid email"]
	},
	password: {
		type: String,
		required: [true, "please enter a password"],
		minlength: [6, "Minimum password length is 6 charachters"]
	}
});

//fire a function after doc saved to database

restaurantSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

restaurantSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) return user;
		else throw Error("incorrecte password");
	}
	throw Error("incorrecte email");
};
restaurantSchema.statics.verifyId = async function (_id) {
	const user = await this.find({ _id });
	if (user) {
		return user;
	}
};

const Restaurant = model("restaurant", restaurantSchema);

module.exports = Restaurant;
