const { withExpo } = require("@expo/next-adapter");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
    "react-native-web",
    "@ui-kitten/components"
]);

module.exports = withPlugins([withTM, withExpo], {});