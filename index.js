"use strict"

const fluentFFmpeg = require("fluent-ffmpeg")
const execa = require("execa")

const getBinaryPaths = require("./lib/get-binary-paths")

const { ffmpeg: newffmpeg, ffprobe: newffprobe } = getBinaryPaths()
fluentFFmpeg.setFfmpegPath(newffmpeg)
fluentFFmpeg.setFfprobePath(newffprobe)
process.env.FFMPEG_PATH = ffmpeg
process.env.FFPROBE_PATH = ffprobe

module.exports = {
    ffmpeg: fluentFFmpeg,
    toPromise: (fluentFFmpegObj) => new Promise((resolve, reject) => fluentFFmpegObj
        .on("error", (err) => reject(err))
        .on("end", () => resolve()),
    ),
    exec: (...args) => {
        const { ffmpeg } = getBinaryPaths()
        return execa(ffmpeg || "ffmpeg", args)
    },
    paths: getBinaryPaths(),
}

// Hello Curry & Angzh
