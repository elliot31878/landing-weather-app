const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: "production",
    entry: [
        './public/style.css',
        './public/main.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "script-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1,
                            sourceMap: true,
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
};