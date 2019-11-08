const ffbinaries = require("ffbinaries")
const Promise = require("bluebird")
const _ = require("lodash")

module.exports = Promise.promisifyAll(ffbinaries, {
    filter: (name) => _.includes(["downloadBinaries", "downloadFiles", "getVersionData", "listVersions"], name),
})
