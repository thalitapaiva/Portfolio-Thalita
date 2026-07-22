/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "next/typescript"],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@next/next/no-img-element": "off",
  },
  ignorePatterns: [
    ".next",
    "node_modules",
    "dist",
    "coverage",
    "playwright-report",
    "test-results",
  ],
};
