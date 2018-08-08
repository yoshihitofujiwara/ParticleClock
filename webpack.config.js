const webpack = require("webpack");

// リリースモード判定フラグ
const IS_PRODUCTION = !!(process.argv[2] && process.argv[2].indexOf("-pro") != -1);

const MODE = IS_PRODUCTION ? "production" : "development";
console.log(`webpack mode: ${MODE}`);


// js file path
const JS = `${__dirname}/src/js/`;



/*--------------------------------------------------------------------------
  module
--------------------------------------------------------------------------*/
module.exports = {
	watch: true,
	mode: MODE,

  entry: {
		scripts: `${JS}/scripts/scripts.js`
  },

  output: {
    filename: "[name].js"
  },

  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: [["env", {
							targets: { browsers: ["last 2 versions"] },
							modules: false
            }]]
          }
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: "glslify-import-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: "raw-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: "glslify-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: "glsl-strip-comments",
        exclude: /node_modules/
      }
    ]
  }
};
