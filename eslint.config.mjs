import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"], 
    languageOptions: {
      globals: globals.browser,
    },
    parser: "@typescript-eslint/parser", // Use the TypeScript parser
    parserOptions: {
      ecmaVersion: 2021, // or the version you are using
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ["@typescript-eslint"],
    rules: {
       // Ignore all linting errors
       "no-console": "off", // Example: allow console logs
       "no-unused-vars": "off", // Example: ignore unused variables
       // Add more rules as needed
    },
  },
];
