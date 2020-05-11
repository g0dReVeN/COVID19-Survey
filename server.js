const express = require('express');
const path = require('path');
const cors = require('cors');
const Multer = require('multer');
const fetch = require("node-fetch");
const { v4 } = require('uuid');
const { Datastore } = require('@google-cloud/datastore');
const { Storage } = require('@google-cloud/storage');
const C19SurveyController = require('./controllers/Covid-19CoughSurvey.js');

const app = express();
const db = new Datastore();
const storage = new Storage();

app.enable('trust proxy');
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));

const multer = Multer({
	storage: Multer.memoryStorage(),
	limits: {
		fileSize: 1 * 1024 * 1024 // max file size 1MB
	},
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.post('/', multer.single('sample'), async (req, res, next) => {
	if (!req.body) {
		res.status(400).send('No data/file uploaded! Please try again.');
		return;
	} else if (!req.body.token) {
		res.status(400).send('No reCAPTCHA token! Please try again.');
		return;
	}

	try {
		const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_V3_SECRET_KEY}&response=${req.body.token}`;
		delete req.body.token;

		fetch(url, {
			method: 'post'
		})
			.then(response => response.json())
			.then(reCaptchaResponse => {

				if (reCaptchaResponse.success) {
					const uuid = v4();

					const entityPromise = C19SurveyController.persist(db, req.body, uuid);

					if (req.file) {
						const now = new Date();
						const dd = now.getUTCDate() < 10 ? '0' + now.getUTCDate() : now.getUTCDate();
						const mm = (now.getUTCMonth() + 1) < 10 ? '0' + (now.getUTCMonth() + 1) : now.getUTCMonth() + 1;

						const file = bucket.file(mm + '-' + dd + '/' + uuid + '.wav');
						const stream = file.createWriteStream({
							resumable: false,
							metadata: {
								contentType: 'audio/wav',
								...req.body
							}
						});

						stream.on('finish', () => {
							Promise.all([entityPromise]).then(() => {
								res.status(200)
									.set()
									.send({ success: 'Survey recorded successfully!' });
							})
						});

						stream.end(req.file.buffer);
					} else {
						Promise.all([entityPromise]).then(() => {
							res.status(200)
								.set()
								.send({ success: 'Survey recorded successfully!' });
						})
					}
				} else {
					res.status(400)
						.set()
						.send({ error: 'Failed reCAPTCHA!' });
				}
			})
			.catch(error => {
				res.status(400)
					.set()
					.send({ error: error.message });
			});
	} catch (err) {
		next(err);
	}
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/views/404.html'));
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});