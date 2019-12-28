const joinWithAppdata = require("../utils/join-with-appdata")
const globbyBinaries = require("./globby-binaries")

module.exports = () => {
    const [ffmpeg, ffprobe, flvmeta] = [
        globbyBinaries("ffmpeg*"),
        globbyBinaries("ffprobe*"),
        globbyBinaries("flvmeta*/flvmeta*"),
    ]
        .map((array) => array[0])
        .map((directory) => directory ? joinWithAppdata("binaries", directory) : directory)
    return { ffmpeg, ffprobe, flvmeta }
}
