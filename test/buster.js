var config = module.exports;

config["My Tests"] = {
   env: "node",
   rootPath: "../",
   sources: [
      "lib/*.js"
   ],
   tests: [
      "test/*Test.js"
   ]
};