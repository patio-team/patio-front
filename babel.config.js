module.exports = {
  presets: [
    '@vue/app'
  ],
  env: {
    production: {
      plugins: [ ['transform-remove-console', { "exclude": [ "error", "info", "warn"] }] ]
    }
  }
}
