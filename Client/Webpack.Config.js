const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPWAManifest = require('webpack-pwa-manifest')
const Path = require('path')
const { InjectManifest } = require('workbox-webpack-plugin');
const { text } = require('express');

// Add & Configure Workbox Plugins For
// Service Worker & Manifest Files

// Add CSS Loaders & Babel To Webpack

module.exports = () => {
    return {
        mode: 'development',
        entry: {
            main: './Source/JS/Index.js',
            install: './Source/JS/Install.js',
        },
        output: {
            filename: '[name].bundle.js',
            path: Path.resolve(__dirname, 'Dist'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './Index.html',
                title: 'J.A.T.E.',
            }),
            new InjectManifest({
                swSrc: './ServiceWorker.js',
                swDest: 'ServiceWorker.js',
            }),
            new WebpackPWAManifest({
                fingerprints: false,
                inject: true,
                name: 'Just Another Text Editor',
                short_name: 'J.A.T.E.',
                description: 'Take Notes With JavaScript Syntax Highlighting!',
                background_color: '#225CA3',
                start_url: '/',
                publicPath: '/',
                icons: [
                    {
                        src: Path.resolve('Source/Images/Logo.png'),
                        sizes: [96, 128, 192, 256, 384, 512],
                        destination: Path.join('Assets', 'Icons'),
                    },
                ],
            }),
        ],
        
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
                        },
                    },
                },
            ],
        },
    };
}