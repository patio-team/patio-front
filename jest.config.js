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
    '^@/(.*)$': '<rootDir>/src/$1'
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
  collectCoverageFrom: [
    'src/**/*.{ts,vue}',
    '!**/node_modules/**',
    '!src/registerServiceWorker.ts'
  ],
  modulePathIgnorePatterns: ['<rootDir>/coverage/'],
}
