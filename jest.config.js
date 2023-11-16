/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  testEnvironment: "jsdom", // テスト環境をjsdomに設定
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy"
  },
};

module.exports = config;
