const { getDefaultConfig } = require('expo/metro-config');
const { withSentryConfig } = require('@sentry/react-native/metro');

// Expoのデフォルト設定を取得
const defaultConfig = getDefaultConfig(__dirname);

// Sentryの設定を統合
const config = withSentryConfig({
  ...defaultConfig, // Sentryの設定を反映
  transformer: {
    ...defaultConfig.transformer,
    // babelTransformerPath: require.resolve('babel-plugin-inline-import'), // 一旦コメントアウト
  },
  resolver: {
    ...defaultConfig.resolver,
    sourceExts: [...defaultConfig.resolver.sourceExts, 'sql'], // SQL拡張子を追加
  },
});

module.exports = config;
