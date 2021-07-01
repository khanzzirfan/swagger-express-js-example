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
  return updateSwaggerYaml;
};
