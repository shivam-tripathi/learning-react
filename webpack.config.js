module.exports = {
    entry: __dirname + "/src/client/js/client.js",
    output: {
         path: __dirname + "/lib/client/js",
         filename: "bundle.js"
    }, module: {
    rules: [ {
            test: __dirname + "/src/client/js",
            loader: 'babel-loader',
            query: {
                presets: ['env', 'stage-0', 'react']
            }
        } ]
    }
}
