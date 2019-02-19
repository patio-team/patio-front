module.exports = {
  root: true,
  'extends': 'stylelint-config-standard',
  'plugins': ['stylelint-order'],
  'rules': {
    'number-leading-zero': 'never',
    'declaration-no-important': true,
    'order/properties-alphabetical-order': true
  }
}
