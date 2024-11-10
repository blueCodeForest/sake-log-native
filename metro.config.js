const { getDefaultConfig } = require('expo/metro-config');
const { withSentryConfig } = require('@sentry/react-native/metro');

// Expoのデフォルト設定を取得
const defaultConfig = getDefaultConfig(__dirname);

// Sentryの設定を統合
const config = withSentryConfig({
  ...defaultConfig, // Sentryの設定を反映
  transformer: {
    ...defaultConfig.transformer,
  },
  resolver: {
    ...defaultConfig.resolver,
    sourceExts: [...defaultConfig.resolver.sourceExts, 'sql', 'svg'], // SQL拡張子とSVG拡張子を追加
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
  },
});

module.exports = config;
