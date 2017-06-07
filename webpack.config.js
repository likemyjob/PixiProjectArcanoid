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
            path.resolve('node_modules')
        ],
        alias: {
            'typedi': path.resolve('node_modules', 'typedi'),
            'Box2d': path.resolve('node_modules', 'box2dweb')
        },
        extensions: [".ts", ".js", ".tsx"]
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: "ts-loader"}
        ]
    },
    externals: {},
    plugins: [],
    watch: true,
    devtool: "eval"
};
