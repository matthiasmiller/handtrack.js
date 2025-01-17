import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import fs from "fs";
import path from "path";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";

const copyPlugin = function (options) {
  return {
    generateBundle() {
      const targDir = path.dirname(options.targ);
      if (!fs.existsSync(targDir)) {
        fs.mkdirSync(targDir);
      }
      fs.writeFileSync(options.targ, fs.readFileSync(options.src));
    },
  };
};

export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/handtrack.min.js',
    format: 'umd',
    name: 'handTrack',
  }, {
    file: 'demo/handtrack.min.js',
    format: 'umd',
    name: 'handTrack',
  }],
  plugins: [
    resolve({
        browser: true
    }),
    commonjs(),
    resolve(),
    terser()
  ]
  // plugins: [resolve()]
  // plugins: [resolve(), copyPlugin({
  //   src: 'src/index.js',
  //   targ: 'demoreact/node_modules/handtrackjs/src/index.js'
  // })]
}

/*
export default {
  input: "reactdemo/src/components/helpers/handtrack.js",
  output: [
    {
      file: "dist/handtrack.min.js",
      format: "umd",
      name: "handTrack",
    },
    {
      file: "demo/handtrack.min.js",
      format: "umd",
      name: "handTrack",
    },
  ],
  plugins: [
    resolve(),
    // terser(),
    copyPlugin({
      src: "reactdemo/src/components/helpers/handtrack.js",
      targ: "src/index.js",
    }),
    copy({
      targets: [
        { src: "reactdemo/public/webmodel/*", dest: "models/webmodel" },
      ],
    }),
  ],
  // plugins: [resolve()],
  // plugins: [resolve(), copyPlugin({
  //   src: 'src/index.js',
  //   targ: 'demoreact/node_modules/handtrackjs/src/index.js'
  // })]
};
*/
