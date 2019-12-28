const globby = require("globby")
const joinWithAppdata = require("../utils/join-with-appdata")

module.exports = (glob) => globby.sync(glob, { cwd: joinWithAppdata("binaries") })
