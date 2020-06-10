module.exports = {
  root: true,
  "defaultSeverity": "warning",
  'extends': 'stylelint-config-standard',
  'plugins': ['stylelint-order'],
  'rules': {
    'number-leading-zero': 'never',
    'declaration-no-important': true,
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": ["define-mixin", "mixin"]
    }],
    'order/properties-alphabetical-order': true,
    'no-descending-specificity': null
  }
}
