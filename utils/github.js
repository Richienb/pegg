const Octokit = require("@octokit/rest")
const userAgent = require("ergent")

module.exports = new Octokit({
    userAgent,
    timeZone: "Etc/UTC",
})
