const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    output: {
        filename: "./bundle.js",
        path: __dirname + "/dist",
        publicPath: "/dist"
    },
    devServer: {
        host: '127.0.0.1',
        hot: true,
        inline: true,
        historyApiFallback: true,
    },
    resolve: {
        extensions: [".js"]
    },
    module: {
        rules: [{
                test: /.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                }
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
}