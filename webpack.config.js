const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'index.bundle.js'
    },
    devServer: {
        contentBase: './',
        publicPath: '/public/',
        watchContentBase: true,
        open: true,
        hot: false
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    url: false
                }
            }]
        },
        {
            test: /\.scss$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: './'
                }
            }, 'css-loader', 'sass-loader']
        },
        {
            test: /\.(png|jpg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'images'
            }
        }, {
            test: /\.(ttf|woff|woff2)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'font'
            }
        }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
}