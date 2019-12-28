const download = require("download")
const cleanSemver = require("clean-semver")

const joinWithAppdata = require("../utils/join-with-appdata")
const conf = require("../utils/conf")

module.exports = async (url, version) => {
    await download(url, joinWithAppdata("binaries"), { extract: true })
    conf.set("flvMetaVersion", cleanSemver(version))
}
