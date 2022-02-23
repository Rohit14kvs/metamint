// eslint-disable-next-line no-undef
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "eqeqeq": "warn",
        "no-invalid-this": "error",
        "no-return-assign": "error",
        "no-unused-expressions": ["error", { "allowTernary": true }],
        "no-useless-concat": "error",
        "no-useless-return": "error",
        "no-constant-condition": "warn",
        "no-unused-vars": ["warn", { "argsIgnorePattern": "req|res|next|__" }],

        //* ES6
        "arrow-spacing": "error",
        "no-confusing-arrow": "error",
        "no-duplicate-imports": "error",
        "no-var": "error",
        "object-shorthand": "off",
        "prefer-const": "error",
        "prefer-template": "warn"
    }
}
