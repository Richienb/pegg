const path = require("path")
const appdataDir = require("./appdata-path")

module.exports = (...dirs) => path.join(appdataDir, ...dirs)
