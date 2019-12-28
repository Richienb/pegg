# Pegg [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/pegg/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/pegg)

FFMpeg with auto installation and a fluent api.

[![NPM Badge](https://nodei.co/npm/pegg.png)](https://npmjs.com/package/pegg)

## Install

```sh
npm install pegg
```

## Usage

```js
const pegg = require("pegg");

(async () => {
    pegg.ffmpeg("/path/to/file.avi"); // See https://www.npmjs.com/package/fluent-ffmpeg
})();
```

## API

### pegg

#### ffmpeg

Type: `fluent-ffmpeg object`

The [Fluent FFMpeg](https://www.npmjs.com/package/fluent-ffmpeg) object to use.

#### toPromise(fluentFFmpegObj)

Convert a [Fluent FFMpeg](https://www.npmjs.com/package/fluent-ffmpeg) object to use a Promise.

##### fluentFFmpegObj

Type: `fluent-ffmpeg object`

The object to convert.

#### exec(...args)

Execute the `ffmpeg` binary with raw commandline input.

##### args

Type: `...string`

The commandline arguments to use.

#### paths

The paths to the binaries that pegg uses.

## Upgrading from v2

- All functions are no longer behind a promise.
- `getBinaryPaths()` is now `paths`.
- Removed prepare. A functional equalivent is automatically run on install.
- Pegg now downloads the binaries to the appdata folder under the `pegg-nodejs` subfolder to prevent the need to redownload the binaries due to clearing the temp directory.

## Upgrading from v1

- Removed `when`. Pegg will now automatically ensure readiness when calling any other functions.
- `paths` has been replaced with `getBinaryPaths`.
- `exec` now only works for `ffmpeg` and assumes each function argument as part of the command.
- `ffmpeg` now returns a promise which will resolve to the fluent ffmpeg object.
- Bluebird promises have been swapped out for native promises via async/await and similar methods.
- Debug information is no longer logged.
