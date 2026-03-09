import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
	{
		files: ['src/**/*.ts'],
		languageOptions: {
			parser,
			ecmaVersion: 2022,
			sourceType: 'module',
		},
		plugins: {
			'@typescript-eslint': tseslint,
		},
		rules: {
			'no-console': 'error',
			'@typescript-eslint/no-explicit-any': 'error',
		},
	},
];
