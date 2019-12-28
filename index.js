"use strict"

const fluentFFmpeg = require("fluent-ffmpeg")
const execa = require("execa")

const getBinaryPaths = require("./lib/get-binary-paths")

const { ffmpeg, ffprobe } = getBinaryPaths()
fluentFFmpeg.setFfmpegPath(ffmpeg)
fluentFFmpeg.setFfprobePath(ffprobe)
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
