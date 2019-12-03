module.exports = {
    "env": {
        "browser": true,
        "amd": true,
        "node": true,
        "jest": true,
        "jquery": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
      "no-unused-vars": "warn",
      "no-console": "off",
      "quotes": [1, "single", { "avoidEscape": true }],
      "semi": "warn",
    }
};
