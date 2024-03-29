const { withExpo } = require("@expo/next-adapter");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
    "react-native-web",
    "@ui-kitten/components"
]);

// module.exports = withPlugins([withTM, withExpo], {});
module.exports = withPlugins([withTM, withExpo], {
    images: {
        domains: [
            'tokens.1inch.io', 
            'etherscan.io',
            'cryptologos.cc'
        ],
        formats: ['image/avif', 'image/webp']
    }
});