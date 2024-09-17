import globals from "globals";
import pluginJs from "@eslint/js";
import react from 'eslint-plugin-react'

export default [
  {
    plugins: {
      react,
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      "react/jsx-no-undef": "error",
      "no-unused-vars": [ "error", { "caughtErrors": "none" } ],
    },
    files: [ "**/*.{js,mjs,cjs,jsx}" ],

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        "globals": true,
        "global": true,
        "route": true,
        "window": true
      }
    }
  },

  pluginJs.configs.recommended,
];