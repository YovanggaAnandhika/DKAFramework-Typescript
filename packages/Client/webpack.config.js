const path = require('path');

module.exports = {
    entry: './src/index.ts',

    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'DKAClientFramework.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'DKA',
        libraryTarget: 'umd'
    }
};