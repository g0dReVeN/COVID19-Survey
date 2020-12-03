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
        "Firefox",
        "Firefox Mobile",
        "Chrome",
        "Chrome Mobile",
        "Chromium",
        "Microsoft Edge",
        "Safari",
        "Samsung Browser",
        "Huawei Browser",
        "Android Browser",
      ].includes(device.client.name)
    ) {
      next();
    } else {
      res.redirect(303, "/platforms");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
