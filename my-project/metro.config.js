// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

sourceExts: ['js', 'json', 'ts', 'tsx'];
module.exports = getDefaultConfig(__dirname);
