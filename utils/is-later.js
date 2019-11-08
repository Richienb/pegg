const semver = require("semver")
const cleanSemver = require("clean-semver")

module.exports = (a, b) => semver.gt(cleanSemver(a), cleanSemver(b))
