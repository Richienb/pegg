"use strict"

const fluentFFmpeg = require("fluent-ffmpeg")
const execa = require("execa")
const isWindows = require("is-windows")()
const onetime = require("onetime")
const isLater = require("is-later")
const { getLatestVersion } = require("ffbinaries-extra")

const github = require("./utils/github")
const getBinaryPaths = require("./lib/get-binary-paths")
const downloadBinaries = require("./lib/download-binaries")
const conf = require("./utils/conf")
const downloadFlvMeta = require("./lib/download-flv-meta")

const prepare = onetime(async () => {
    const { ffmpeg, ffprobe, flvmeta } = await getBinaryPaths()
    const latestVersion = await getLatestVersion()

    if (isWindows) {
        const { data } = await github.repos.getLatestRelease({
            owner: "noirotm",
            repo: "flvmeta",
        })
        const { tag_name: tagName, assets } = data

        if (isLater(tagName, conf.get("flvMetaVersion") || "0.0.0") || !flvmeta) await downloadFlvMeta(assets[0].browser_download_url, tagName)

        const { flvmeta: newflvmeta } = await getBinaryPaths()

        fluentFFmpeg.setFlvtoolPath(newflvmeta)
        process.env.FLVMETA_PATH = newflvmeta
    }

    if (isLater(latestVersion, conf.get("FFmpegVersion") || "0.0.0") || !ffmpeg || !ffprobe) {
        await downloadBinaries(latestVersion)

        const { ffmpeg: newffmpeg, ffprobe: newffprobe } = await getBinaryPaths()
        fluentFFmpeg.setFfmpegPath(newffmpeg)
        fluentFFmpeg.setFfprobePath(newffprobe)
        process.env.FFMPEG_PATH = ffmpeg
        process.env.FFPROBE_PATH = ffprobe
    }
})

module.exports = {
    ffmpeg: async () => {
        await prepare()
        return fluentFFmpeg
    },
    toPromise: (fluentFFmpegObj) => new Promise((resolve, reject) => fluentFFmpegObj
        .on("error", (err) => reject(err))
        .on("end", () => resolve()),
    ),
    exec: async (...args) => {
        await prepare()
        return execa(process.env.FFMPEG_PATH || "ffmpeg", args)
    },
    getBinaryPaths: async (...args) => {
        await prepare()
        return getBinaryPaths(...args)
    },
}

// Hello Curry & Angzh
