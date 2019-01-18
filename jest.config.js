module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/**/{stories,example,fixtures}.js',
    '!<rootDir>/src/stories/**',
  ],
  roots: ["<rootDir>/src/"],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  snapshotSerializers: ['jest-serializer-html'],
  setupTestFrameworkScriptFile: "./tests/setup-tests.js",
};
