var path = require('path');
module.exports = {
    entry: path.resolve("./src/app.ts"),
    output: {
        path: path.resolve("./dist"),
        filename: "bundle.js",
        library: "home"
    },
    resolve: {
        modules: [
            path.resolve('node_modules')
        ],
        alias:{
            'typedi': path.resolve('node_modules','typedi')
        },
        extensions: [".ts", ".js", ".tsx"]
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader"}
        ]
    },
    watch: true,
    devtool: "eval"
};
