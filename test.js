import test from "ava"
import pegg from "."

test("main", async (t) => {
    t.truthy(pegg.ffmpeg)
    t.truthy(pegg.exec)
    t.truthy(pegg.toPromise)
    t.truthy(pegg.getBinaryPaths)
    t.true((await pegg.exec("--help")).stderr.startsWith("ffmpeg"))
})
