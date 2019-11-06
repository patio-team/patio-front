module.exports = {
  moduleFileExtensions: [
    'vue',
    'ts',
    'tsx',
    'pug',
    'js',
    'jsx',
    'json',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.pug$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    "\\.(css)$": '<rootDir>/tests/unit/styleMock.ts',
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/src/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/',
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  setupFiles: [
    '<rootDir>/tests/unit/setup.ts',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,vue}',
    '!src/App.vue',
    '!src/i18n.ts',
    '!src/main.ts',
    '!**/node_modules/**',
    '!src/registerServiceWorker.ts'
  ],
  modulePathIgnorePatterns: ['<rootDir>/coverage/'],
}
