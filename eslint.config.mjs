import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = {
  // Extends base Next.js ESLint configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Define custom rules to disable
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // Disable 'no-explicit-any' rule
    '@typescript-eslint/no-unused-vars': 'off', // Disable 'no-unused-vars' rule
    '@typescript-eslint/no-unused-expressions': 'off', // Disable 'no-unused-expressions' rule
    '@typescript-eslint/no-this-alias': 'off', // Disable 'no-this-alias' rule
    '@typescript-eslint/no-require-imports': 'off', // Disable 'no-require-imports' rule
  },
};

export default eslintConfig;
