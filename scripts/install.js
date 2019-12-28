"use strict"

const fluentFFmpeg = require("fluent-ffmpeg")
const isWindows = require("is-windows")()
const isLater = require("is-later")
const { getLatestVersion } = require("ffbinaries-extra")

const github = require("../utils/github")
const getBinaryPaths = require("../lib/get-binary-paths")
const downloadBinaries = require("../lib/download-binaries")
const conf = require("../utils/conf")
const downloadFlvMeta = require("../lib/download-flv-meta")

module.exports = (async () => {
    const { ffmpeg, ffprobe, flvmeta } = getBinaryPaths()
    const latestVersion = await getLatestVersion()

    if (isWindows) {
        const { data } = await github.repos.getLatestRelease({
            owner: "noirotm",
            repo: "flvmeta",
        })
        const { tag_name: tagName, assets } = data

        if (isLater(tagName, conf.get("flvMetaVersion") || "0.0.0") || !flvmeta) await downloadFlvMeta(assets[0].browser_download_url, tagName)

        const { flvmeta: newflvmeta } = getBinaryPaths()

        fluentFFmpeg.setFlvtoolPath(newflvmeta)
        process.env.FLVMETA_PATH = newflvmeta
    }

    if (isLater(latestVersion, conf.get("FFmpegVersion") || "0.0.0") || !ffmpeg || !ffprobe) await downloadBinaries(latestVersion)
})()
