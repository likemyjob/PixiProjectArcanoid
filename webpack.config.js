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
            path.resolve('dist')
        ],
        alias: {
            'typedi': path.resolve('node_modules', 'typedi')
        },
        extensions: [".ts", ".js", ".tsx"]
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: "ts-loader"}
        ]
    },
    externals:{
        'box2d': 'MyTest'
    },
    plugins: [],
    watch: true,
    devtool: "eval"
};
