import test from "ava"
import fs from "fs-extra"
import * as pegg from "."

test("main", async (t) => {
    t.truthy(pegg.ffmpeg)
    t.truthy(pegg.exec)
    t.truthy(pegg.toPromise)
    t.truthy(pegg.paths)
    t.true((await pegg.exec("--help")).stderr.startsWith("ffmpeg"))
    t.true(await fs.pathExists(pegg.paths.ffmpeg))
    t.true(await fs.pathExists(pegg.paths.ffprobe))
    t.true(await fs.pathExists(pegg.paths.flvmeta))
})
