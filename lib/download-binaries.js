const { downloadBinariesAsync } = require("./ffbinaries-promise")
const joinWithTemp = require("../utils/join-with-temp")
const conf = require("../utils/conf")

module.exports = (version) => downloadBinariesAsync(["ffmpeg", "ffprobe"], {
    destination: joinWithTemp("binaries"),
    version,
}).then(() => conf.set("FFmpegVersion", version))
