module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/strict",
    "plugin:react-hooks/recommended",
    "plugin:xss/recommended",
    "plugin:security/recommended",
    "prettier",
  ],

  overrides: [],

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },

  plugins: [
    "react",
    "@typescript-eslint",
    "jsx-a11y",
    "prettier",
    "react-hooks",
    "no-comments",
    "optimize-regex",
    "no-secrets",
    "xss",
    "import"
  ],

  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-secrets/no-secrets": "error",
    "no-comments/disallowComments": [
      "error",
      {
        allow: ["TODO", "FIXME", "NOTE", "DEBUG"]
      }
    ],
    "optimize-regex/optimize-regex": [
      "warn",
      {
        blacklist: ["charClassClassrangesMerge"]
      }
    ],
    "no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_"
      }
    ],
    "import/newline-after-import": ["error", { count: 1 }]
  },

  settings: {
    react: {
      version: "detect"
    }
  }
};
