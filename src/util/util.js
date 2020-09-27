const fs = require("fs");
const path = require("path");

module.exports = (relPath) => {
  //   let rel_path = path;
  function createFolder(name) {
    const pathname = `${path.resolve(__dirname, relPath, name)}`;
    return fs.mkdirSync(pathname, { recursive: true });
  }
  function cpyDir(dir, src) {
    const root = fs.readdirSync(path.resolve(__dirname, dir));

    root.forEach((file) => {
      const isDir = fs
        .lstatSync(path.resolve(__dirname, relPath, dir, file))
        .isDirectory();
      if (isDir) {
        fs.mkdirSync(path.resolve(__dirname, relPath, src, dir), {
          recursive: true,
        });
        cpyDir(`${dir}/${file}`, src);
      } else {
        fs.mkdirSync(path.resolve(__dirname, src, dir), {
          recursive: true,
        });

        fs.copyFileSync(
          path.resolve(__dirname, dir, file),
          path.resolve(__dirname, src, dir, file)
        );
      }
    });
  }
  function createModel(route, auth = false) {
    fs.writeFile(
      path.resolve(__dirname, relPath, "models", `${route}.js`),
      require(`../templates/Models/${auth ? "authModel" : "model"}`)(route),
      function (err) {
        if (err) console.log(err);
      }
    );
  }

  function createRoute(name, modelPath, auth = false) {
    fs.writeFile(
      path.resolve(__dirname, relPath, "routes", `${name}.js`),
      require(`../templates/Routes/${auth ? "authRoute" : "route"}`)(
        name,
        modelPath
      ),
      function (err) {
        if (err) console.log(err);
      }
    );
  }

  function createAuth(name, modelPath, modes) {
    modes.forEach((provider) => {
      fs.writeFile(
        path.resolve(
          __dirname,
          relPath,
          "routes",
          `${name}-${provider}-Auth.js`
        ),
        require(`../templates/Routes/${provider}AuthRoute`)(name),
        function (err) {
          if (err) console.log(err);
        }
      );
      fs.writeFile(
        path.resolve(
          __dirname,
          relPath,
          "config",
          `${name}-${provider}-passportStrategy.js`
        ),
        require(`../templates/Config/PassportStrategies/${provider}-passportStrategy`)(
          name,
          modelPath
        ),
        function (err) {
          if (err) console.log(err);
        }
      );
    });
  }

  function createPassport_Serialize_Deserialize(authRoutes) {
    fs.writeFile(
      path.resolve(
        __dirname,
        relPath,
        "config",
        "passport_Serialize_Deserialize.js"
      ),

      require("../templates/Config/serialize-deserialize")(authRoutes),
      function (err) {
        if (err) console.log(err);
      }
    );
  }

  function createMiddleware(name) {
    fs.writeFile(
      path.resolve(__dirname, relPath, "middleware", `${name}Auth.js`),
      require("../templates/Middleware/authMiddleware")(name),
      function (err) {
        if (err) console.log(err);
      }
    );
  }

  function createEmailSetup() {
    fs.writeFile(
      path.resolve(__dirname, relPath, "config", "emailSetup.js"),
      require(`../templates/Config/emailSetup`)(),
      function (err) {
        if (err) console.log(err);
      }
    );
  }

  function createDotenv(config) {
    let content = "";
    Object.keys(config).forEach(
      (key) => (content += `${key}=${config[key]}\n`)
    );

    fs.writeFile(path.resolve(__dirname, relPath, ".env"), content, function (
      err
    ) {
      if (err) console.log(err);
    });
  }
  function createGitignore() {
    fs.writeFile(
      path.resolve(__dirname, relPath, ".gitignore"),
      `node_modules/\n`,
      function (err) {
        if (err) console.log(err);
      }
    );
  }

  function createServer(routes, authRoutes, providers) {
    fs.writeFile(
      path.resolve(__dirname, relPath, "index.js"),

      require("../templates/serevr")(routes, authRoutes, providers),
      function (err) {
        if (err) console.log(err);
      }
    );
  }
  function createStaticFrontend({ register, signin }) {
    if (register) {
      cpyDir(
        "../templates/Frontend-Static/shellHacks-registration",
        path.resolve(__dirname, relPath, "StaticFrontend")
      );
    }
    if (signin) {
      cpyDir(
        "../templates/Frontend-Static/responsiveLogin",
        path.resolve(__dirname, relPath, "StaticFrontend")
      );
    }
  }
  return {
    createFolder,
    createRoute,
    createModel,
    createAuth,
    createPassport_Serialize_Deserialize,
    createMiddleware,
    createEmailSetup,
    createDotenv,
    createGitignore,
    createServer,
    createStaticFrontend,
  };
};
