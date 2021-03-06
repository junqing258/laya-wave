module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        "browser": true,
        "node": true,
        "es6": true
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
        "prefer-rest-params": 0,
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/interface-name-prefix": 0,
        "@typescript-eslint/no-this-alias": 0,
        "@typescript-eslint/camelcase": 1
    },
};

// {   
//     "parser": "babel-eslint",
//     "parserOptions": {
//         "ecmaVersion": 2018,
//         "sourceType": "module",
//         "ecmaFeatures": {
//             "js": true
//         }        
//     },
//     "globals": {
//         "Laya": true,
//         "laya": true,
//         "Rx": true
//     },
//     "rules": {
//         "flowtype/no-types-missing-file-annotation": 1,
//         "comma-dangle": ["off", "always-multiline"],
//         "semi": 1,
//         "camelcase": 0,
//         "one-var": 0,
//         "indent": [0, "tab"],
//         "no-tabs": "off",
//         "babel/new-cap": 1,
//         "babel/no-invalid-this": 1,
//         "linebreak-style": [0, "windows"],
//         "class-methods-use-this": 0,
//         "padded-blocks": [0, "always"],
//         "quotes": [0, "double", { "allowTemplateLiterals": true }],
//         "no-use-before-define": ["error", { "functions": false, "classes": true }]
//     },
//     "extends": [
//         "plugin:flowtype/recommended"
//     ], 
//     "plugins": [
//         "flowtype"
//     ]
// }