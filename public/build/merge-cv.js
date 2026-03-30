"use strict";

const fs = require("fs");
const path = require("path");

const [, , flagsFile, outputFile] = process.argv;

const contentPath = path.join(__dirname, "../ejs/cv-content.json");
const flagsPath = path.join(__dirname, "../ejs", flagsFile);
const tmpDir = path.join(__dirname, "../.tmp");
const outputPath = path.join(tmpDir, outputFile);

const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
const flags = JSON.parse(fs.readFileSync(flagsPath, "utf8"));

fs.mkdirSync(tmpDir, { recursive: true });
fs.writeFileSync(
  outputPath,
  JSON.stringify(Object.assign({}, content, flags), null, 2),
  "utf8",
);

console.log(`Merged ${flagsFile} + cv-content.json → ${outputPath}`);
