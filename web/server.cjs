const { spawnSync } = require("child_process");

const server = spawnSync("npm", ["run", "start"], {
  stdio: "inherit",
});

if (server.status !== 0) {
  console.error("Server failed to start", server.stderr?.toString());
  process.exit(1);
}

console.log("Server started");
