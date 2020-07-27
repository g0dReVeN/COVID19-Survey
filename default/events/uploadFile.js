const { Storage } = require("@google-cloud/storage");

const storage = new Storage();

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

const uploadFile = (fileToUpload, uuid) => {
	const now = new Date();

	const dd = now.getUTCDate() < 10 ? "0" + now.getUTCDate() : now.getUTCDate();
	const mm =
		now.getUTCMonth() + 1 < 10
			? "0" + (now.getUTCMonth() + 1)
			: now.getUTCMonth() + 1;

	const file = bucket.file(mm + "-" + dd + "/" + uuid + ".wav");

	const stream = file.createWriteStream({
		resumable: false,
		metadata: {
			contentType: "audio/wav"
		},
	});

	stream.end(fileToUpload.buffer);
};

module.exports = uploadFile;
