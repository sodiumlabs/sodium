const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const webpack = require("webpack");

module.exports = async function(env, argv) {
    const config = await createExpoWebpackConfigAsync({
        ...env,
        babel: {
            dangerouslyAddModulePathsToTranspile: ['@ui-kitten/components']
        }
    }, argv);

    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
        })
    )
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        })
    )

    return config;
};