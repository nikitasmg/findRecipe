"use strict";
import { readFile, writeFile } from "fs";
import imagemin from "imagemin";
import imageminGifsicle from "imagemin-gifsicle";
import imageminJpegtran from "imagemin-jpegtran";
import imageminOptipng from "imagemin-optipng";
import imageminSvgo, { Options } from "imagemin-svgo";

type ValueOf<Obj> = Obj[keyof Obj];
type OneOnly<Obj, Key extends keyof Obj> = Pick<Obj, Key>;
type OneOfByKey<Obj> = { [key in keyof Obj]: OneOnly<Obj, key> };
export type OneOfType<Obj> = ValueOf<OneOfByKey<Obj>>;

const plugins = [
  imageminGifsicle({
    interlaced: true
  }),

  imageminJpegtran({
    progressive: true
  }),

  imageminOptipng({
    optimizationLevel: 5
  }),

  imageminSvgo({
    plugins: [{ removeViewBox: false } as OneOfType<Options["plugins"]>]
  })
];

const minifyFile = (filename: string) =>
  new Promise<Buffer>((resolve, reject) =>
    readFile(filename, (err, data) => (err ? reject(err) : resolve(data)))
  )
    .then((originalBuffer: Buffer) =>
      imagemin.buffer(originalBuffer, { plugins }).then((minimizedBuffer) => ({
        minimizedBuffer
      }))
    )
    .then(
      ({ minimizedBuffer }) =>
        new Promise((resolve, reject) =>
          writeFile(filename, minimizedBuffer, (err) =>
            err ? reject(err) : resolve(minimizedBuffer)
          )
        )
    );

Promise.resolve(process.argv)
  .then((x) => x.slice(2))
  .then((x) => x.map(minifyFile))
  .then((x) => Promise.all(x))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
