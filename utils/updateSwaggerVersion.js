const standardVersion = require("standard-version");
const path = require("path");
const fs = require("fs-extra");
const yaml = require("js-yaml");
const chalk = require("chalk");

const LogError = chalk.bold.red;
const LogWarning = chalk.keyword("orange");
const LogInfo = chalk.blueBright;

function updateSwaggerVersionInline() {
  standardVersion({
    noVerify: true,
    infile: "docs/CHANGELOG.md",
    silent: true,
  })
    .then(() => {
      // standard-version is done
    })
    .catch((err) => {
      console.error(`standard-version failed with message: ${err.message}`);
    });

  console.log(LogInfo(">>>> parsing swagger inline"));
  const rootPath = path.join(process.cwd(), "");
  const rawSwaggerYaml = yaml.load(
    fs.readFileSync(path.join(rootPath, "/swagger.yaml"), "utf8")
  );

  if (!rawSwaggerYaml) {
    console.log(LogError(">>>> stopping. Swagger yaml not found."));
    return;
  }
  console.log(LogInfo(">>>> updating version of swagger api"));
  rawSwaggerYaml.info.version = "1.0.0.alpha+444";
  let updateSwaggerYaml = yaml.dump(rawSwaggerYaml);

  console.log(LogInfo(">>>> wiriting to swagger yaml"));

  fs.writeFileSync(
    path.join(rootPath, "/swagger.yaml"),
    updateSwaggerYaml,
    "utf8"
  );

  console.log(LogInfo(">>>> finished swagger.yaml updates"));
}

updateSwaggerVersionInline();
// module.exports = updateSwaggerVersionInline;
