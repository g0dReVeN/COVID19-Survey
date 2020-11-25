const ftpSrv = require("ftp-srv");
const path = require("path");

const HOMEDIR = path.join(__dirname, "/public");
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";
const PORT = process.env.PORT || 2121;

const ftpServer = new ftpSrv({
  url: `ftp://${HOSTNAME}:${PORT}`,
  pasv_url: `ftp://${HOSTNAME}`,
  anonymous: true,
});

ftpServer.on("login", (data, resolve, _) => {
  // console.log("[login] Connection by", data);
  console.log("[login] Setting home dir to:", HOMEDIR);

  resolve({ root: HOMEDIR });
});

ftpServer.listen().then(() => {
  console.log(`Server running at ftp://${HOSTNAME}:${PORT}/`);
});
