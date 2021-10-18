const { Schema, model } = require("mongoose");

const likeSchema = new Schema({
	id: {
		type: String,
		unique: true,
		required: [true, "please enter an id plats or restaurant"]
	},
	users: [
		{
			id: {
				type: String
			}
		}
	],
	length: Number
});

const Like = model("like", likeSchema);

module.exports = Like;
