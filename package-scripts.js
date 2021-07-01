const npsUtils = require("nps-utils");

module.exports = {
  scripts: {
    validate: npsUtils.concurrent.nps("lint", "build", "test --coverage"),
    lint: "eslint .",
    build: "webpack --env.production",
    test: "jest",
    swagger: {
      default: npsUtils.series.nps("swagger.dereference", "swagger.validate"),
      dereference:
        "npx swagger-cli bundle -r swagger-ref.yaml -o swagger.yaml -t yaml",
      validate: "npx swagger-cli validate swagger.yaml",
      updateVersion: "node ./utils/updateSwaggerVersion.js",
    },
  },
};
