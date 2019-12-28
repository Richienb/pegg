const { downloadBinaries } = require("ffbinaries-extra")
const joinWithAppdata = require("../utils/join-with-appdata")
const conf = require("../utils/conf")

module.exports = async (version) => {
    await downloadBinaries({
        components: ["ffmpeg", "ffprobe"],
        destination: joinWithAppdata("binaries"),
        version,
    })
    conf.set("FFmpegVersion", version)
}

