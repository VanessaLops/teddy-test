module.exports = function (api) {
  api.cache(true);
  return {
      presets: ['babel-preset-expo'],
      plugins: [
          [
              'module-resolver',
              {
                  root: '.',
                  extensions: ['.ts', '.tsx', '.android.js', '.android.tsx', '.ios.js', '.ios.tsx'],
              },
          ],
          'react-native-reanimated/plugin',
      ],
  };
};
