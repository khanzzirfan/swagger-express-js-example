const stringifyPackage = require("stringify-package");
const detectIndent = require("detect-indent");
const detectNewline = require("detect-newline");
const yaml = require("js-yaml");

module.exports.readVersion = function (contents) {
  console.log(">>>> parsing swagger inline");
  const rawSwaggerYaml = yaml.load(contents);
  return rawSwaggerYaml.info.version;
};

module.exports.writeVersion = function (contents, version) {
  const rawSwaggerYaml = yaml.load(contents);
  rawSwaggerYaml.info.version = version;
  let updateSwaggerYaml = yaml.dump(rawSwaggerYaml);
  let indent = detectIndent(updateSwaggerYaml).indent;
  let newline = detectNewline(updateSwaggerYaml);
  return updateSwaggerYaml;
};
