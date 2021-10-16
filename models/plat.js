const { Schema, model } = require("mongoose");

const platSchema = new Schema({
	name: {
		type: String,
		minlength: [3, "Minimum name length is 2 charachters"],
		required: [true, "please enter an name"]
	},
	type: {
		type: String
	},
	description: {
		type: String,
		required: [true, "please enter an description"],
		lowercase: true,
		minlength: [15, "Minimum description length is 15 charachters"]
	},
	prix: {
		type: String,
		required: [true, "please enter an prix"]
	},
	devise: {
		type: String,
		required: [true, "please enter an devise"]
	},
	id: {
		type: String
	}
});

platSchema.statics.show = async function () {
	const plats = await this.find({});
	return plats;
};

platSchema.statics.ById = async function (id) {
	const plats = await this.find({ id });
	return plats;
};

const Plat = model("plat", platSchema);

module.exports = Plat;
