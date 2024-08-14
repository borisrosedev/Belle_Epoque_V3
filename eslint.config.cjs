const eslint = require("@eslint/js");
const globals = require("globals")

module.exports = [
    eslint.configs.recommended,
    {
        ignores: ["coverage/**/*.js","**/*.config.cjs", "**/*.config.js"]
    },
    {
        files: ["src/**/*.js", "main.js"],
        ignores: [ "**/*.test.js"],
        rules: {
            semi: "error",
            "prefer-const": "error",
            "no-unused-vars": "off"
        },
        languageOptions: {
            ecmaVersion: "latest",
            globals: {
                ...globals.browser
            },     
        }
    },
    {
        files: ["**/*.test.js"],
        ignores: ["coverage/**"],
        languageOptions: {
            globals: {
                it: "readonly",
                describe: "readonly",
                beforeAll: "readonly",
                test: "readonly",
                expect: "readonly",
                document: "readonly",
                root: "writable"
            },
        }
    }
    
];
