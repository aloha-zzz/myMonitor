module.exports = {
    mode: 'production',
    entry: "./src/index.js",
    output: {
        filename: "./bundle.js",
        path: __dirname + "/dist",
        publicPath: "/dist"
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
}