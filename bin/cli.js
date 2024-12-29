#!/usr/bin/env node --no-warnings=ExperimentalWarning

const { setupTheme } = require("../src/core.js");

async function main() {
	await setupTheme();
}

main().catch((err) => {
	console.error("❌ An error occurred:", err);
	process.exit(1);
});
