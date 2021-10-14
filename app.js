const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { requireAuth } = require("./middlewares/authMiddlewares");
const { MaxAge } = require("./controllers/authController");

const app = express();

// middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
mongoose
	.connect("mongodb://localhost:27017/kun", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => {
		app.listen(3000, () => {
			console.log("evrything is ok");
		});
	})
	.catch((err) => console.log(err));

// routes
// app.use("*", requireAuth);
app.use(authRoutes);

//cookies
app.get("/set-cookie", (req, res) => {
	res.cookie("newUser", "", {
		maxAge: MaxAge,
		httpOnly: true
	});
	res.send("you got the cookies !!!");
});

app.get("/read-cookie", (req, res) => {
	const cookies = req.cookies;
	res.json(cookies);
});