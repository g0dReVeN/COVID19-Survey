const path = require("path");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage();

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

const uploadFile = (fileToStore, uuid) => {
	const now = new Date();

	const dd = now.getUTCDate() < 10 ? "0" + now.getUTCDate() : now.getUTCDate();
	const mm =
		now.getUTCMonth() + 1 < 10
			? "0" + (now.getUTCMonth() + 1)
			: now.getUTCMonth() + 1;

	const ext = path.extname(fileToStore.originalname) ?? '.m4a';
	const file = bucket.file(mm + "-" + dd + "/" + uuid + ext.toLowerCase());

	const stream = file.createWriteStream({
		resumable: false,
		metadata: {
			...(fileToStore.mimetype && { contentType: fileToStore.mimetype })
		},
	});

	stream.end(fileToStore.buffer);
};

module.exports = uploadFile;
