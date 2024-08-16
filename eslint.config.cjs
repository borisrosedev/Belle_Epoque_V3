const eslint = require("@eslint/js");
const globals = require("globals");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
module.exports = [
	eslint.configs.recommended,
	eslintPluginPrettierRecommended,
	{
		ignores: ["coverage/**/*.js", "**/*.config.cjs", "**/*.config.js"]
	},
	{
		files: ["**/*.cjs"],
		rules: {
			"prettier/prettier": "off"
		},
		languageOptions: {
			ecmaVersion: "latest",
			globals: {
				__dirname: "readonly",
				console: "readonly",
				process: "readonly"
			}
		}
	},
	{
		files: ["src/**/*.js", "main.js", "server.js"],
		ignores: ["**/*.test.js"],
		rules: {
			semi: "error",
			"prettier/prettier": "off",
			"prefer-const": "error",
			"no-unused-vars": "off"
		},
		languageOptions: {
			ecmaVersion: "latest",
			globals: {
				...globals.browser,
				Stripe: "readonly"
			}
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
			}
		}
	}
];
