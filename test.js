import test from "ava"
import pegg from "."

test("main", async (t) => {
    t.truthy(pegg.ffmpeg)
    t.truthy(pegg.exec)
    t.truthy(pegg.toPromise)
    t.truthy(pegg.ready)
    t.truthy(pegg.paths)
    t.true((await pegg.exec("ffmpeg", ["--help"])).stderr.startsWith("ffmpeg"))
    t.true(await pegg.ready().then(() => true))
})
