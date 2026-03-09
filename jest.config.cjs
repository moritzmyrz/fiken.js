module.exports = {
	testEnvironment: 'node',
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
	},
	testMatch: ['**/*.test.ts'],
	collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts'],
};
