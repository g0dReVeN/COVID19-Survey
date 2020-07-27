const express = require("express");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const rowStructure = require("./rowStructure");

const app = express();
const sheets = google.sheets("v4");

const rawBodySaver = (req, res, buf, encoding) => {
	if (buf && buf.length) {
		req.rawBody = buf.toString(encoding || "utf8");
	}
};

const secureMiddleware = async (req, res, next) => {
	if (
		req.header("x-appengine-queuename") !== process.env.APP_ENGINE_QUEUE ||
		req.header("x-appengine-default-version-hostname") !==
			process.env.APP_ENGINE_DEFAULT_HOSTNAME
	) {
		return res.status(403).send("Unauthorized");
	} else {
		next();
		return;
	}
};

app.enable("trust proxy");
app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(
	bodyParser.raw({
		verify: rawBodySaver,
		type: () => {
			return true;
		},
	})
);
app.use(secureMiddleware);

app.post("/", async (req, res) => {
	const bodyData = JSON.parse(req.rawBody);

	// console.log(bodyData);

	const request = {
		spreadsheetId: process.env.SHEET_ID,
		range: "Sheet1!A:B",
		includeValuesInResponse: false,
		valueInputOption: "USER_ENTERED",
		insertDataOption: "INSERT_ROWS",
		resource: {
			values: Object.keys(rowStructure),
		},
	};

	// we need to send this status to tell cloud task about the completion of task.
	try {
		const response = (await sheets.spreadsheets.values.append(request)).data;
		console.log(JSON.stringify(response, null, 2));
		res.sendStatus(200);
	} catch (err) {
		console.error(err);
	}
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
