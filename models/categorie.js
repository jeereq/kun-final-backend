const { Schema, model } = require("mongoose");

const categorieSchema = new Schema({
	name: {
		type: String,
		lowercase: true,
		unique: [true, "unique categorie only"]
	}
});

categorieSchema.statics.add = async function (name) {
	const categorie = await this.findOne({ name });
	if (categorie) throw Error("incorrecte categorie");
	return true;
};
categorieSchema.statics.show = async function (name) {
	const categories = await this.find({});
	return categories;
};

const Categorie = model("categorie", categorieSchema);

module.exports = Categorie;
