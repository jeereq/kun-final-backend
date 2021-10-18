const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new Schema({
	pseudo: {
		type: String,
		minlength: [2, "Minimum pseudo length is 2 charachters"],
		required: [true, "please enter an pseudo"]
	},
	type: {
		type: String
	},
	email: {
		type: String,
		required: [true, "please enter an email"],
		unique: true,
		lowercase: true,
		validate: [isEmail, "please enter a valid email"]
	},
	password: {
		type: String,
		required: [true, "please enter an password"],
		minlength: [6, "Minimum password length is 6 charachters"]
	},
	phoneNumber: {
		type: String,
		required: [true, "please enter an phone number"],
		minlength: [10, "Minimum phoe number length is 10 charachters"]
	}
});

//fire a function after doc saved to database

userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	this.type = "user";
	next();
});

userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) return user;
		else throw Error("incorrecte password");
	}
	throw Error("incorrecte email");
};

const User = model("user", userSchema);

module.exports = User;
