const globby = require("globby")
const joinWithTemp = require("../utils/join-with-temp")

module.exports = (glob) => globby(glob, { cwd: joinWithTemp("binaries") })
