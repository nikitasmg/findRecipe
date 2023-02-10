import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api-template.dev.echo-company.ru/graphql",
  generates: {
    "src/api/generated/graphql.ts": {
      plugins: ["typescript"]
    }
  }
};

export default config;
