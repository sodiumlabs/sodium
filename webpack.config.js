const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
    const config = await createExpoWebpackConfigAsync({
        ...env,
        babel: {
            dangerouslyAddModulePathsToTranspile: ['@ui-kitten/components']
        }
    }, argv);

    config.output.hashFunction = "xxhash64";
    config.output.hashDigestLength = 16;

    return config;
};