module.exports = {
    mode: 'development',
    entry: __dirname + "/src/client/js/client.js",
    output: {
            path: __dirname + "/client/static/js",
            filename: "bundle.js",
        },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                },
                exclude: /node_modules/,
            },
        ],
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
}
