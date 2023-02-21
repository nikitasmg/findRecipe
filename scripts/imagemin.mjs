"use strict";
import { readFile, writeFile } from "fs";
import imagemin from "imagemin";
import imageminGifsicle from "imagemin-gifsicle";
import imageminJpegtran from "imagemin-jpegtran";
import imageminOptipng from "imagemin-optipng";
import imageminSvgo from "imagemin-svgo";

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
    plugins: [{ removeViewBox: false }]
  })
];
const minifyFile = (filename) =>
  new Promise((resolve, reject) =>
    readFile(filename, (err, data) => (err ? reject(err) : resolve(data)))
  )
    .then((originalBuffer) =>
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
