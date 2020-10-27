module.exports = {
  clearMocks: false,
  testEnvironment: "node",
  verbose: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["./src/**/*.js"],
  testPathIgnorePatterns: ["./dist", "./node_modules"],
};
