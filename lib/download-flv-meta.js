const download = require("download")
const cleanSemver = require("clean-semver")
const toBluebird = require("to-bluebird")

const joinWithTemp = require("../utils/join-with-temp")
const Conf = require("conf")
const conf = new Conf()
module.exports = (url, version) => {
    return toBluebird(download(url, joinWithTemp("binaries"), { extract: true }))
        .then(() => conf.set("flvMetaVersion", cleanSemver(version)))
}
