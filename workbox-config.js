const path = require('path');

module.exports = {
  globDirectory: 'build',
  globPatterns: [
    '**/*.{html,svg,png,webp,webm,json}',
    'app.js',
  ],
  swSrc: path.join('build', 'service-worker.js'),
  swDest: path.join('build', 'service-worker.js'),
};