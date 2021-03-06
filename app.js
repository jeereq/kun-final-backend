const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const routes = require("./routes/routes");

const app = express();

// middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// database connection
mongoose
	.connect(
		"mongodb+srv://jeereq:mj13111999@cluster0.w82cr.mongodb.net/kun?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		}
	)
	.then(() => {
		app.listen(3000, () => {
			console.log("evrything is ok");
		});
	})
	.catch((err) => console.log(err));

// routes

app.use(authRoutes);
app.use("/api/", routes);
