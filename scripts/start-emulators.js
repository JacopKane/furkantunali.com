const fs = require("fs");
const path = require("path");
const net = require("net");
const { spawn } = require("child_process");

const ROOT = process.cwd();
const FIREBASE_CONFIG_PATH = path.join(ROOT, "firebase.json");
const TEMP_CONFIG_PATH = path.join(ROOT, ".firebase.emulators.dynamic.json");

function isPortFree(port, host = "127.0.0.1") {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once("error", () => {
      resolve(false);
    });

    server.once("listening", () => {
      server.close(() => resolve(true));
    });

    server.listen(port, host);
  });
}

async function findFreePort(startPort, host = "127.0.0.1", maxOffset = 200) {
  for (let offset = 0; offset <= maxOffset; offset += 1) {
    const candidate = startPort + offset;
    // eslint-disable-next-line no-await-in-loop
    const free = await isPortFree(candidate, host);
    if (free) {
      return candidate;
    }
  }
  throw new Error(`No free port found starting from ${startPort}`);
}

async function buildDynamicConfig() {
  const raw = fs.readFileSync(FIREBASE_CONFIG_PATH, "utf8");
  const config = JSON.parse(raw);

  const emulators = {
    ...(config.emulators || {}),
  };

  const host = (emulators.hosting && emulators.hosting.host) || "127.0.0.1";

  const ports = {
    hub: await findFreePort(
      (emulators.hub && emulators.hub.port) || 4410,
      host,
    ),
    ui: await findFreePort((emulators.ui && emulators.ui.port) || 4010, host),
    logging: await findFreePort(
      (emulators.logging && emulators.logging.port) || 4510,
      host,
    ),
    functions: await findFreePort(
      (emulators.functions && emulators.functions.port) || 5001,
      host,
    ),
    hosting: await findFreePort(
      (emulators.hosting && emulators.hosting.port) || 8088,
      host,
    ),
  };

  config.emulators = {
    ...emulators,
    hub: {
      ...(emulators.hub || {}),
      port: ports.hub,
    },
    ui: {
      enabled: true,
      ...(emulators.ui || {}),
      port: ports.ui,
    },
    logging: {
      ...(emulators.logging || {}),
      port: ports.logging,
    },
    functions: {
      ...(emulators.functions || {}),
      port: ports.functions,
    },
    hosting: {
      ...(emulators.hosting || {}),
      port: ports.hosting,
    },
  };

  fs.writeFileSync(TEMP_CONFIG_PATH, JSON.stringify(config, null, 2));

  return ports;
}

function cleanupTempConfig() {
  if (fs.existsSync(TEMP_CONFIG_PATH)) {
    fs.unlinkSync(TEMP_CONFIG_PATH);
  }
}

async function main() {
  try {
    const ports = await buildDynamicConfig();

    console.log("Using dynamic emulator ports:");
    console.log(`  hosting: ${ports.hosting}`);
    console.log(`  functions: ${ports.functions}`);
    console.log(`  ui: ${ports.ui}`);
    console.log(`  hub: ${ports.hub}`);
    console.log(`  logging: ${ports.logging}`);

    const child = spawn(
      "firebase",
      [
        "emulators:start",
        "--only",
        "hosting,functions",
        "--config",
        TEMP_CONFIG_PATH,
      ],
      {
        stdio: "inherit",
        shell: true,
      },
    );

    const onExit = () => cleanupTempConfig();
    process.on("exit", onExit);
    process.on("SIGINT", () => {
      child.kill("SIGINT");
    });
    process.on("SIGTERM", () => {
      child.kill("SIGTERM");
    });

    child.on("exit", (code) => {
      cleanupTempConfig();
      process.exit(code == null ? 1 : code);
    });
  } catch (error) {
    cleanupTempConfig();
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
