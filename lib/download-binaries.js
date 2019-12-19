const { downloadBinaries } = require("ffbinaries-extra")
const joinWithTemp = require("../utils/join-with-temp")
const conf = require("../utils/conf")

module.exports = async (version) => {
    await downloadBinaries({
        components: ["ffmpeg", "ffprobe"],
        destination: joinWithTemp("binaries"),
        version,
    })
    conf.set("FFmpegVersion", version)
}

