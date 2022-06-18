module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          '#components': './src/components',
          '#screens': './src/screens',
          '#navigation': './src/navigation',
          '#api': './src/core/api',
          '#config': './src/core/config',
          '#utils': './src/core/utils',
          '#styles': './src/styles',
          '#assets': './src/snitchedData/assets',
        },
      },
    ],
  ],
};
