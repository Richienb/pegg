"use strict"

const fluentFFmpeg = require("fluent-ffmpeg")
const execa = require("execa")
const debug = require("debug")("ffmpeg")
const Promise = require("bluebird")
const toBluebird = require("to-bluebird")
const EveryReady = require("every-ready")
const isWindows = require("is-windows")()
const _ = require("lodash")

const github = require("./utils/github")
const getBinaryPaths = require("./lib/get-binary-paths")
const downloadBinaries = require("./lib/download-binaries")
const highestVersion = require("./lib/highest-version")
const conf = require("./utils/conf")
const isLater = require("./utils/is-later")
const downloadFlvMeta = require("./lib/download-flv-meta")

const everyReady = new EveryReady(2)

if (isWindows) {
    Promise.all([github.repos.getLatestRelease({
        owner: "noirotm",
        repo: "flvmeta",
    }), getBinaryPaths()])
        .spread(({ data }, { flvmeta }) => {
            const { tag_name: tagName, assets } = data
            if (isLater(tagName, conf.get("flvMetaVersion") || "0.0.0") || !flvmeta) return downloadFlvMeta(_.first(assets).browser_download_url, tagName)
            return null
        })
        .then(() => getBinaryPaths())
        .then(({ flvmeta }) => {
            if (flvmeta) fluentFFmpeg.setFlvtoolPath(flvmeta)
            process.env.FLVMETA_PATH = flvmeta
            return everyReady.readiness[0] = true
        })
        .catch((err) => {
            if (err.name === "HttpError") return
            debug(`error: ${err}`)
        })
}

Promise.all([highestVersion(), getBinaryPaths()])
    .spread((highestVersion, { ffmpeg, ffprobe }) => ({
        updateNeeded:
            isLater(highestVersion, conf.get("FFmpegVersion") || "0.0.0") || !ffmpeg || !ffprobe,
        highestVersion,
    }))
    .then(({ updateNeeded, highestVersion }) => {
        if (updateNeeded) return downloadBinaries(highestVersion)
        return null
    })
    .then(() => getBinaryPaths())
    .then(({ ffmpeg, ffprobe }) => {
        if (ffmpeg) fluentFFmpeg.setFfmpegPath(ffmpeg)
        if (ffprobe) fluentFFmpeg.setFfmpegPath(ffmpeg)
        process.env.FFMPEG_PATH = ffmpeg
        process.env.FFPROBE_PATH = ffprobe
        return everyReady.readiness[1] = true
    })
    .catch((err) => debug(`error: ${err}`))

module.exports = {
    ffmpeg: fluentFFmpeg,
    toPromise: (fluentFFmpegObj) => new Promise((resolve, reject) => {
        fluentFFmpegObj
            .on("progress", (progress) => {
                debug(`progress: ${JSON.stringify(progress)}`)
            })
            .on("error", (err) => {
                debug(`error: ${err.message}`)
                reject(err)
            })
            .on("end", () => {
                debug("finished")
                resolve()
            })
    }),
    exec: (forExec, args) => {
        if (forExec === "ffmpeg") forExec = process.env.FFMPEG_PATH || "ffmpeg"
        if (forExec === "ffprobe") forExec = process.env.FFPROBE_PATH || "ffprobe"
        return toBluebird(execa(forExec, args))
    },
    ready: everyReady.when,
    paths: getBinaryPaths,
}

// Hello Curry & Angzh
