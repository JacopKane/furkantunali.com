const path = require("path");

/**
 * By default Puppeteer downloads Chrome to ~/.cache/puppeteer (the current
 * user's home directory). On Firebase gen2 Cloud Run containers, the build
 * phase runs as root but the runtime runs as www-data — different $HOME
 * directories — so Chrome is never found at runtime.
 *
 * Setting cacheDirectory to a path inside the functions directory ensures
 * Chrome is downloaded here during Cloud Build and is part of the container
 * image layer, making it available regardless of which user runs the process.
 */
module.exports = {
  cacheDirectory: path.join(__dirname, ".cache", "puppeteer"),
};
