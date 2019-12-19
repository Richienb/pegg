const joinWithTemp = require("../utils/join-with-temp")
const globbyBinaries = require("./globby-binaries")

module.exports = async () => {
    const dirs = await Promise.all([globbyBinaries("ffmpeg*"), globbyBinaries("ffprobe*"), globbyBinaries("flvmeta*/flvmeta*")])
    const [ffmpeg, ffprobe, flvmeta] = dirs.map((array) => array[0]).map((directory) => directory ? joinWithTemp(directory) : directory)
    return { ffmpeg, ffprobe, flvmeta }
}
