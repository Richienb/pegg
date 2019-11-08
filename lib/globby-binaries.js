const globby = require("globby")
const joinWithTemp = require("../utils/join-with-temp")
const toBluebird = require("to-bluebird")

module.exports = (val) => toBluebird(globby(val, { cwd: joinWithTemp("binaries") }))
