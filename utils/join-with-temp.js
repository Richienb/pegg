const tempDir = require("pkg-temp")
const path = require("path")

module.exports = (...dirs) => path.join(tempDir, ...dirs)
