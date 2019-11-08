const { listVersionsAsync } = require("./ffbinaries-promise")
const latestSemver = require("latest-semver")

module.exports = () => listVersionsAsync().then(latestSemver)
