const express = require("express");
const path = require("path");
const cors = require("cors");
const Multer = require("multer");
const fetch = require("node-fetch");
const { v4 } = require("uuid");
const createTask = require("./events/createTask");
const uploadFile = require("./events/uploadFile");

const RECAPTCHA_URL =
	"https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_V3_SECRET_KEY}&response=";

const app = express();

app.enable("trust proxy");
app.use(cors());
app.use(express.static(path.join(__dirname, "/public")));

const multer = Multer({
	storage: Multer.memoryStorage(),
	limits: {
		fileSize: 1 * 1024 * 1024, // max file size 1MB
	},
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.post("/", multer.single("sample"), async (req, res, next) => {
	if (!req.body) {
		res.status(400).send("No data/file uploaded! Please try again.");
		return;
	} else if (!req.body.token) {
		res.status(400).send("No reCAPTCHA token! Please try again.");
		return;
	}

	try {
		cconsole.log(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_V3_SECRET_KEY}&response=${req.body.token}`);
		console.log(`${RECAPTCHA_URL}${req.body.token}`);
		fetch(`${RECAPTCHA_URL}${req.body.token}`, {
			method: "post",
		})
			.then((response) => response.json())
			.then((reCaptchaResponse) => {
				if (reCaptchaResponse.success) {
					const uuid = v4();

					createTask({ ...req.body, uuid });

					if (req.file) {
						uploadFile(req.file, uuid);
					}

					res
						.status(200)
						.set()
						.send({ success: "Survey recorded successfully!" });
				} else {
					res.status(400).set().send({ error: "Failed reCAPTCHA!" });
				}
			})
			.catch((error) => {
				res.status(400).set().send({ error: error.message });
			});
	} catch (err) {
		next(err);
	}
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/views/404.html"));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
