const Promise = require("bluebird")
const globbyBinaries = require("./globby-binaries")
const joinWithTemp = require("../utils/join-with-temp")
const _ = require("lodash")

module.exports = () => Promise.all([globbyBinaries("ffmpeg*"), globbyBinaries("ffprobe*"), globbyBinaries("flvmeta*/flvmeta*")])
    .then((res) => res.map((val) => _.first(val)))
    .then((res) => res.map((val) => val ? joinWithTemp(val) : val))
    .spread((ffmpeg, ffprobe, flvmeta) => ({
        ffmpeg,
        ffprobe,
        flvmeta,
    }))
