const DeviceDetector = require("device-detector-js");

module.exports = (req, res, next) => {
  try {
    const deviceDetector = new DeviceDetector();
    const device = deviceDetector.parse(req.headers["user-agent"]);

    if (
      device.os &&
      device.os.name === "iOS" &&
      device.client &&
      device.client.name !== "Mobile Safari"
    ) {
      res.redirect(302, "ftp://ftp.coughtest.online/index.html");
    } else if (
      device.client &&
      [
        "Internet Explorer",
        "IE Mobile",
        "Microsoft Edge",
        "UC Browser",
        "UC Browser Mini",
        "UC Browser Turbo",
        "Samsung Browser",
        "Huawei Browser",
        "Android Browser",
        "BlackBerry Browser",
        "LG Browser",
        "Nokia Browser",
        "Opera Mobile",
        "Opera",
        "Oppo Browser",
      ].includes(device.client.name)
    ) {
      res.redirect(303, "/platforms");
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
