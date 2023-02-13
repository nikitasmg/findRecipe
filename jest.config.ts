// eslint-disable-next-line no-comments/disallowComments
/** @type {import('ts-jest').JestConfigWithTsJest} */

const testRoot = "<rootDir>/test";
const mockRoot = `${testRoot}/__mocks__`;

const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [`${testRoot}/jestSetup.ts`],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `${mockRoot}/fileMock.js`,
    "\\.(css|scss)$": `${mockRoot}/styleMock.js`,
    "^~(.*)$": "<rootDir>/src/$1",
    "^~shared(.*)$": "<rootDir>/src/shared/$1",
    "^~generated$": "<rootDir>/src/api/generated/graphql.ts",
    "^~stores(.*)$": "<rootDir>/src/shared/stores/$1"
  },
  collectCoverageFrom: [
    "src/**/*.{js,ts,jsx,tsx}",
    "!src/**/*.d.ts",
    "!**/node_modules/**",
    "!**/generated/**",
    "!**/test/**"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  testMatch: ["**/*.test.{js,ts,jsx,tsx}"]
};

export default config;
