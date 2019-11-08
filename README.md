# Pegg [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/pegg/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/pegg)

FFMpeg with auto installation and a fluent api.

[![NPM Badge](https://nodei.co/npm/pegg.png)](https://npmjs.com/package/pegg)

## Install

```sh
npm install pegg
```

## Usage

```js
const { ffmpeg } = require("pegg");

ffmpeg("/path/to/file.avi"); // See https://www.npmjs.com/package/fluent-ffmpeg
```

## API

### pegg

#### ffmpeg

Type: `fluent-ffmpeg object`

The [Fluent FFMpeg](https://www.npmjs.com/package/fluent-ffmpeg) object to use.

#### toPromise(fluentFFmpegObj)

Convert the [Fluent FFMpeg](https://www.npmjs.com/package/fluent-ffmpeg) object to use a Promise.

##### fluentFFmpegObj

Type: `fluent-ffmpeg object`

The object to convert.

#### exec(forExec, args)

Execute the `ffmpeg` or `ffprobe` binaries with raw commandline input.

##### forExec

Type: `"ffmpeg" or "ffprobe"`

The binary to use.

##### args

Type: `string[]`

The commandline arguments to use.

#### ready()

Returns a promise which will resolve when Pegg is ready.

#### paths()

Returns a promise that will resolve with the paths to the binaries that pegg uses.
