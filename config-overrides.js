const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@": "src/",
    "@shared": "src/shared",
    "@generated": "src/api/generated/graphql.ts",
    "@stores": "src/shared/stores"
  })(config);

  return config;
};
