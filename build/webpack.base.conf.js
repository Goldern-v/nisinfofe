var path = require("path");
var utils = require("./utils");
var config = require("../config");
var vueLoaderConfig = require("./vue-loader.conf");
var webpack = require("webpack");
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  // entry: {
  //   app: './src/main.js',
  // },
  entry: utils.entries(),
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src")
    }
  },
  // 添加代码
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          resolve("src"),
          resolve("test"),
          resolve("node_modules/vue-echarts"),
          resolve("node_modules/vue-particles"),
          resolve("node_modules/v-viewer"),
          resolve("node_modules/_v-viewer@0.2.3@v-viewer"),
          resolve("node_modules/_vue-particles@1.0.9@vue-particles"),
          // resolve("node_modules/_ecrm-element-ui@2.9.7@ecrm-element-ui"),
          // resolve("node_modules/ecrm-element-ui"),
          resolve("node_modules/view-design"),
          resolve("node_modules/_view-design@4.0.2@view-design")
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          // limit: 2097152,
          name: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
      }
    ]
  }
};
