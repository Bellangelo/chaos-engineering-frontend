const path = require('path');

module.exports = {
    entry: {
        index: './src/index.ts', // Main library entry point
        sw: './src/service-worker/sw.ts', // Service worker entry point
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'ChaosEngineeringFrontend',
        libraryTarget: 'var',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    target: ['web', 'es5']
};