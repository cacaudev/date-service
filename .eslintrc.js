module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    "jest/globals": true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  parser: "babel-eslint",
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "max-len": [2, 90, 8],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "require-atomic-updates": "off",
    "global-require": "off",
    "import/prefer-default-export": "off",
    "no-unused-expressions": ["error", { allowTaggedTemplates: true }],
  },
};
