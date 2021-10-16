const { Schema, model } = require("mongoose");

const themeSchema = new Schema({
	name: {
		type: String,
		unique: true,
		lowercase: true
	}
});

themeSchema.statics.show = async function () {
	const themes = await this.find({});
	return themes;
};

const Theme = model("theme", themeSchema);

module.exports = Theme;
