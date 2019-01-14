module.exports = {
  coverageDirectory: '../coverage/',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/**/*.js',
    '!<rootDir>/**/{stories,example,fixtures}.js',
    '!<rootDir>/stories/**',
  ],
  rootDir: 'src',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  snapshotSerializers: ['jest-serializer-html'],
  setupTestFrameworkScriptFile: "../tests/setup-tests.js",
};
