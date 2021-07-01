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
    release: {
      default: npsUtils.series.nps(
        "swagger.dereference",
        "swagger.validate",
        "version.standard"
      ),
      alpha: npsUtils.series.nps(
        "swagger.dereference",
        "swagger.validate",
        "version.alpha"
      ),
      beta: npsUtils.series.nps(
        "swagger.dereference",
        "swagger.validate",
        "version.beta"
      ),
    },
    version: {
      default: "standard-version",
      standard: "standard-version",
      alpha: "standard-version --prerelease alpha",
      beta: "standard-version --prerelease beta",
    },
  },
};
