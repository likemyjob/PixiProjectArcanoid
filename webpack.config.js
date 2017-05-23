var path = require('path');
module.exports = {
    entry: {
        game: path.resolve("./src/app.ts")
    },
    output: {
        path: path.resolve("./dist"),
        filename: "[name].js",
        library: "[name]"
    },
    resolve: {
        modules: [
            path.resolve('node_modules'),
            path.resolve('node_modules/mytest/mytt'),
        ],
        alias: {
            'typedi': path.resolve('node_modules', 'typedi'),
            'mytest': path.resolve('../dist/node_modules/mytest/mytt')
        },
        extensions: [".ts", ".js", ".tsx"]
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: "ts-loader"}
        ]
    },
    plugins: [],
    watch: true,
    devtool: "eval"
};
