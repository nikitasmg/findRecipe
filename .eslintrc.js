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
    "prettier"
  ],

  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "security/detect-object-injection": "off",
        "react/prop-types": "off"
      }
    }
  ],

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
    "linebreak-style": ["error", process.platform === "win32" ? "windows" : "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-secrets/no-secrets": "error",
    "xss/no-mixed-html": [
      "warn",
      {
        htmlVariableRules: ["AsHtml", "HtmlEncoded/i", "^html$"],
        htmlFunctionRules: [".asHtml/i", "toHtml"],
        functions: {
          $: {
            htmlInput: true,
            safe: ["document", "this"]
          },
          ".html": {
            htmlInput: true,
            htmlOutput: true
          },
          ".join": {
            passthrough: { obj: true, args: true }
          }
        }
      }
    ],
    "no-comments/disallowComments": [
      "error",
      {
        allow: ["TODO", "FIXME", "NOTE", "DEBUG", "eslint-disable-next-line"]
      }
    ],
    "optimize-regex/optimize-regex": [
      "warn",
      {
        blacklist: ["charClassClassrangesMerge"]
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
