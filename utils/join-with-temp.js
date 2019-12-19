const path = require("path")
const tempDir = require("pkg-temp")

module.exports = (...dirs) => path.join(tempDir, ...dirs)
