const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const rawBodySaver = (req, res, buf, encoding) => {
	if (buf && buf.length) {
		req.rawBody = buf.toString(encoding || "utf8");
	}
};

const secureMiddleware = async (req, res, next) => {
	if (req.header("X-AppEngine-QueueName") != "my-queue") {
		console.log("No X-AppEngine-QueueName is specified");
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

app.post("/", (req, res) => {
	const bodyData = JSON.parse(req.rawBody);

    console.log(req.rawBody);
	// we need to send this status to tell cloud task about the completion of task.
	res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
