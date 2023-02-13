// Learn more https://docs.expo.dev/guides/monorepos
const { getDefaultConfig } = require('expo/metro-config');
const crypto = require.resolve('crypto-browserify');
const url = require.resolve('url/');

// Find the project and workspace directories
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

const { transformer, resolver } = config;

config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg', 'ts', 'tsx', 'js', 'jsx', 'cjs'],
    extraNodeModules: {
        crypto,
        url,
        fs: require.resolve('react-native-level-fs'),
        http: require.resolve('@tradle/react-native-http'),
        https: require.resolve('https-browserify'),
        net: require.resolve('react-native-tcp'),
        os: require.resolve('react-native-os'),
        stream: require.resolve('stream-browserify'),
        vm: require.resolve('vm-browserify'),
    }
}

module.exports = config;