const download = require("download")
const cleanSemver = require("clean-semver")

const joinWithTemp = require("../utils/join-with-temp")
const conf = require("../utils/conf")

module.exports = async (url, version) => {
    await download(url, joinWithTemp("binaries"), { extract: true })
    conf.set("flvMetaVersion", cleanSemver(version))
}
