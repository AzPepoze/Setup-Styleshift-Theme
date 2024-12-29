const fs = require("fs");
const path = require("path");
const ora = require("ora").default;

function copyFolderRecursiveSync(srcPath, destPath, spinner) {
	if (!fs.existsSync(srcPath)) {
		spinner.fail(`❌ Source folder not found: ${srcPath}`);
		process.exit(1);
	}

	if (!fs.existsSync(destPath)) {
		fs.mkdirSync(destPath, { recursive: true });
	}

	const items = fs.readdirSync(srcPath);

	items.forEach((item) => {
		const srcItem = path.join(srcPath, item);
		const destItem = path.join(destPath, item);

		try {
			if (fs.statSync(srcItem).isDirectory()) {
				copyFolderRecursiveSync(srcItem, destItem, spinner);
			} else {
				fs.copyFileSync(srcItem, destItem);
			}
			spinner.text = `📁 Copying: ${srcItem}`;
		} catch (err) {
			spinner.fail(`❌ Failed to copy: ${srcItem}`);
			throw err;
		}
	});
}

async function setupTheme() {
	const spinner = ora("🔄️ Setting up Styleshift theme...").start();

	const srcPath = path.resolve(__dirname, "../dist");
	const destPath = process.cwd();

	try {
		copyFolderRecursiveSync(srcPath, destPath, spinner);
		spinner.succeed("✅ Theme setup complete!");
	} catch (err) {
		spinner.fail("❌ Theme setup failed!");
		throw err;
	}
}

module.exports = { setupTheme };
