import Ffmpeg from "fluent-ffmpeg"
import Promise from "bluebird"
import execa from "execa"

declare interface Paths {
    ffmpeg: string | void,
    ffprobe: string | void,
    flvmeta: string | void
}

declare const Pegg: {
    /**
     * The [Fluent FFMpeg](https://www.npmjs.com/package/fluent-ffmpeg) object to use.
    */
    ffmpeg: typeof Ffmpeg;

    /**
     * Convert the [Fluent FFMpeg](https://www.npmjs.com/package/fluent-ffmpeg) object to use a Promise.
     * @param fluentFFmpegObj The object to convert.
    */
    toPromise: (fluentFFmpegObj: typeof Ffmpeg.FfmpegCommand) => Promise<void>;

    /**
     * Execute the `ffmpeg` or `ffprobe` binaries with raw commandline input.
     * @param forExec The binary to use.
     * @param args The commandline arguments to use.
    */
    exec(forExec: "ffmpeg" | "ffprobe", args: string[]): Promise<execa.ExecaReturnValue<string>>;

    /**
     * Returns a promise which will resolve when Pegg is ready.
    */
    ready: () => Promise<void>

    /**
     * Returns a promise that will resolve with the paths to the binaries that pegg uses.
    */
    paths: () => Promise<Paths>
}

export = Pegg
