module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
      "func-names": 0,
      "linebreak-style": 0,
      "import/prefer-default-export": 0,
      "no-nested-ternary": 0,
      "object-curly-newline": 0,
      "max-len": 0,
      "prefer-destructuring": 0,
      "no-undef": 0,
      "no-bitwise": 0,
      "import/no-cycle": 0,
    }
};
