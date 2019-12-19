import Ffmpeg from "fluent-ffmpeg"
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
    ffmpeg: Promise<typeof Ffmpeg>;

    /**
     * Convert the [Fluent FFMpeg](https://www.npmjs.com/package/fluent-ffmpeg) object to use a Promise.
     * @param fluentFFmpegObj The object to convert.
    */
    toPromise: (fluentFFmpegObj: typeof Ffmpeg.FfmpegCommand) => Promise<void>;

    /**
     * Execute the `ffmpeg` binary with raw commandline input.
     * @param args The commandline arguments to use.
    */
    exec(args: string[]): Promise<execa.ExecaReturnValue<string>>;

    /**
     * Returns a promise that will resolve with the paths to the binaries that pegg uses.
    */
    getBinaryPaths: () => Promise<Paths>
}

export = Pegg
