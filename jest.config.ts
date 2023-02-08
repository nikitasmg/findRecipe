/** @type {import('ts-jest').JestConfigWithTsJest} */

const testRoot = "<rootDir>/test";
const mockRoot = `${testRoot}/__mocks__`;

const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [`${testRoot}/jestSetup.ts`],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `${mockRoot}/fileMock.js`,
    "\\.(css|scss)$": `${mockRoot}/styleMock.js`
  },
  collectCoverageFrom: [
    "src/**/*.{js,ts,jsx,tsx}",
    "!src/**/*.d.ts",
    "!**/node_modules/**",
    "!**/generated/**",
    "!**/test/**"
  ],
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  testMatch: ["**/*.test.{js,ts,jsx,tsx}"]
};

export default config;
