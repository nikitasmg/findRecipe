import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://yugra-api.dev.echo-company.ru/graphql",
  documents: ["src/api/**/queries.ts"],
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-query"],
      config: {
        fetcher: "graphql-request"
      }
    }
  }
};

export default config;
