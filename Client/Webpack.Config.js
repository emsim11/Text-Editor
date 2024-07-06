const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPWAManifest = require('webpack-pwa-manifest')
const Path = require('path')
const { InjectManifest } = require('workbox-webpack-plugin')
const path = require('path')

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
            filename: '[Name].Bundle.js',
            path: Path.resolve(__dirname, 'Dist'),
        },
        plugins: [

        ],
        
        module: {
            rules: [

            ],
        },
    };
};