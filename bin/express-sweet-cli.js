#!/usr/bin/env node

/**
 * Express Sweet Application Generator CLI.
 *
 * A CLI tool that scaffolds Express web applications using the Express Sweet framework.
 * Supports both ESM and CJS module formats via selectable templates.
 *
 * Generation Flow:
 *
 *   CLI invoked
 *       │
 *       ▼
 *   main()
 *       │  resolve target directory
 *       │  derive app name
 *       ▼
 *   checkDirectoryEmpty()
 *       │
 *       ├── empty ──────────────────┐
 *       │                           │
 *       └── not empty               │
 *            │                      │
 *            ▼                      │
 *       confirm() ── no ──► exit    │
 *            │                      │
 *            yes                    │
 *            │                      │
 *            ▼                      │
 *   createApplication() ◄──────────┘
 *       │
 *       ├── 1. Copy templates/{cjs|esm}/ → target dir
 *       ├── 2. Render package.json.ejs → package.json (inject name)
 *       │      then delete .ejs source
 *       ▼
 *   displaySetupInstructions()
 *       │
 *       └── Print: cd, npm install, npm run setup, npm start
 */

const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');
const { Command } = require('commander');
const readline = require('readline');
const version = require('../package').version;

const program = new Command();

/**
 * Wraps an object's method with a function that receives the original method and its arguments,
 * allowing custom logic before, after, or instead of the original call (AOP: Around Advice).
 *
 * @param {Object} targetObject - The object containing the method to wrap.
 * @param {string} methodName - The name of the method to wrap.
 * @param {Function} wrapperFn - The wrapper function. Receives the original method as the first
 *   argument and an array of the original arguments as the second.
 * @example
 * const service = {
 *   greet(name) { return `Hello, ${name}`; }
 * };
 *
 * around(service, 'greet', function(originalMethod, args) {
 *   console.log('Before:', args);
 *   const result = originalMethod.apply(this, args);
 *   console.log('After:', result);
 *   return result;
 * });
 */
function around(targetObject, methodName, wrapperFn) {
  const originalMethod = targetObject[methodName];
  targetObject[methodName] = function () {
    return wrapperFn.call(this, originalMethod, [...arguments]);
  }
}

/**
 * Inserts a function to execute before an object's method is called (AOP: Before Advice).
 * The original method runs immediately after the injected function completes.
 *
 * @param {Object} targetObject - The object containing the method to wrap.
 * @param {string} methodName - The name of the method to wrap.
 * @param {Function} beforeFn - The function to execute before the original method.
 * @example
 * const logger = {
 *   log(message) { console.log(message); }
 * };
 *
 * before(logger, 'log', function() {
 *   console.log(`[${new Date().toISOString()}]`);
 * });
 */
function before(targetObject, methodName, beforeFn) {
  const originalMethod = targetObject[methodName];
  targetObject[methodName] = function () {
    beforeFn.call(this);
    originalMethod.apply(this, arguments);
  }
}

/**
 * Displays a confirmation prompt on STDOUT/STDIN and invokes a callback with the result.
 * Accepts "y", "yes", "ok", or "true" (case-insensitive) as affirmative responses.
 *
 * @param {string} message - The confirmation message to display.
 * @param {Function} callback - Receives `true` for affirmative input, `false` otherwise.
 * @example
 * confirm('Continue? [y/N] ', (confirmed) => {
 *   if (confirmed) {
 *     console.log('Proceeding...');
 *   } else {
 *     console.log('Cancelled.');
 *   }
 * });
 */
function confirm(message, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(message, input => {
    rl.close();
    callback(/^(y|yes|ok|true)$/i.test(input));
  });
}

/**
 * Generates an Express Sweet application in the specified directory.
 * Copies templates and renders EJS template files with application-specific values.
 *
 * @param {string} appName - The application name (used in package.json).
 * @param {string} installDir - The target directory path for the generated application.
 */
function createApplication(appName, installDir) {
  console.log();

  const output = program.opts().output === 'esm' ? 'esm' : 'cjs';
  const templateDir = path.join(__dirname, '..', `templates/${output}`);

  // Copy templates to the target directory and log each file
  fs.copySync(templateDir, installDir);
  const copiedFiles = [];
  (function listFiles(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        listFiles(fullPath);
      } else if (entry.name !== 'package.json.ejs') {
        copiedFiles.push(fullPath);
      }
    }
  })(installDir);
  copiedFiles.forEach(file => {
    console.log(`   \x1b[36mcreate\x1b[0m : ${file}`);
  });

  // Render EJS template files with application-specific values
  renderTemplate(path.join(installDir, 'package.json'), { name: appName });

  // Print setup instructions to the console
  displaySetupInstructions(installDir);
}

/**
 * Prints post-generation setup instructions to the console.
 * Adjusts command examples based on the runtime environment (Windows cmd.exe vs Unix shell).
 *
 * @param {string} installDir - The directory where the application was generated.
 */
function displaySetupInstructions(installDir) {
  const prompt = launchedFromCmd() ? '>' : '$';

  console.log();
  console.log('   \x1b[32m✨ Your app is ready!\x1b[0m');

  // Show cd command only when the app was generated outside the current directory
  if (installDir !== '.') {
    console.log();
    console.log('   change directory:');
    console.log(`     ${prompt} cd ${installDir}`);
  }

  console.log();
  console.log('   install dependencies:');
  console.log(`     ${prompt} npm install`);

  console.log();
  console.log('   set up the database:');
  console.log(`     ${prompt} npm run setup`);

  console.log();
  console.log('   run the app:');
  console.log(`     ${prompt} npm start`);

  console.log();
  console.log('   Happy coding! \x1b[33m🚀\x1b[0m');
  console.log();
}

/**
 * Derives a valid application name from the installation directory path.
 * Strips non-alphanumeric characters (except hyphens and dots) and converts to lowercase
 * to produce a name suitable for use as an npm package name.
 *
 * @param {string} installDir - The absolute path of the installation directory.
 * @returns {string} A sanitized, lowercase application name.
 * @example
 * deriveAppName('/home/user/My App!!');
 * // => 'my-app'
 *
 * deriveAppName('/home/user/___test-project___');
 * // => 'test-project'
 */
function deriveAppName(installDir) {
  return path.basename(installDir)
    .replace(/[^A-Za-z0-9.-]+/g, '-')
    .replace(/^[-_.]+|-+$/g, '')
    .toLowerCase();
}

/**
 * Checks whether a directory is empty or does not exist.
 * A non-existent directory (ENOENT) is treated as empty.
 *
 * @param {string} dirPath - The directory path to check.
 * @param {Function} callback - Receives `true` if the directory is empty or missing,
 *   `false` if it contains files.
 * @example
 * checkDirectoryEmpty('./new-project', (isEmpty) => {
 *   if (isEmpty) {
 *     console.log('Safe to create application.');
 *   } else {
 *     console.log('Directory already contains files.');
 *   }
 * });
 */
function checkDirectoryEmpty(dirPath, callback) {
  fs.readdir(dirPath, (error, files) => {
    if (error && error.code !== 'ENOENT') {
      throw error;
    }
    // Treat non-existent directory (ENOENT) or zero files as empty
    callback(!files || !files.length);
  });
}

/**
 * Waits for all pending stdout/stderr writes to flush before terminating the process.
 * Works around a Node.js bug on Windows where piped output can be truncated on exit.
 *
 * @param {number} exitCode - The process exit code (0 for success, non-zero for failure).
 * @see https://github.com/joyent/node/issues/6247
 * @see https://github.com/visionmedia/mocha/issues/333
 */
function gracefulExit(exitCode) {
  /**
   * Decrements the pending drain counter and exits once all streams have flushed.
   */
  function onDrained() {
    if (!(pendingDrains--)) {
      originalProcessExit(exitCode);
    }
  }

  let pendingDrains = 0;
  const streams = [process.stdout, process.stderr];

  gracefulExit.exited = true;

  // Submit an empty write to each stream and wait for the drain callback
  streams.forEach(function (stream) {
    pendingDrains += 1;
    stream.write('', onDrained);
  });

  onDrained();
}

/**
 * Determines whether the process was launched from Windows cmd.exe.
 * Unix shells set the `_` environment variable, while cmd.exe does not.
 *
 * @returns {boolean} `true` if running under cmd.exe, `false` otherwise.
 */
function launchedFromCmd() {
  return process.platform === 'win32' && process.env._ === undefined;
}

/**
 * Renders an EJS template file and writes the result as the final output file.
 * Reads `<outputFilePath>.ejs`, interpolates the given variables, writes the result
 * to `<outputFilePath>`, and then deletes the `.ejs` source file.
 *
 * @param {string} outputFilePath - The destination file path (without the .ejs extension).
 * @param {Object} templateVariables - Variables to interpolate into the template.
 * @param {string} [templateVariables.name] - The application name.
 * @example
 * // Renders package.json.ejs with the given variables and writes package.json
 * renderTemplate('./my-app/package.json', { name: 'my-app' });
 */
function renderTemplate(outputFilePath, templateVariables) {
  const templateFile = `${outputFilePath}.ejs`;
  const templateContent = fs.readFileSync(templateFile, 'utf-8');
  const renderedContent = ejs.render(templateContent, templateVariables);

  fs.writeFileSync(outputFilePath, renderedContent);
  console.log(`   \x1b[36mcreate\x1b[0m : ${outputFilePath}`);

  // Remove the source template file after rendering
  fs.unlinkSync(templateFile);
}

/**
 * Main CLI entry point.
 * Resolves the target directory, checks its state, and initiates application generation.
 */
function main() {
  const installDir = program.args[0] || '.';
  const appName = deriveAppName(path.resolve(installDir)) || 'myapp';

  checkDirectoryEmpty(installDir, isEmpty => {
    if (isEmpty || program.opts().force) {
      // Directory is empty or --force flag was specified; proceed immediately
      createApplication(appName, installDir);
    } else {
      // Directory contains files; ask the user for confirmation before overwriting
      confirm('destination is not empty, continue? [y/N] ', confirmed => {
        if (confirmed) {
          process.stdin.destroy();
          createApplication(appName, installDir);
        } else {
          console.error('aborting');
          gracefulExit(1);
        }
      });
    }
  });
}

// Preserve the original process.exit for use inside gracefulExit
const originalProcessExit = process.exit;
process.exit = gracefulExit;

// Extend Commander.js error handling via AOP

// Show help before reporting a missing option argument
around(program, 'optionMissingArgument', function (originalMethod, args) {
  program.outputHelp();
  originalMethod.apply(this, args);
  return { args: [], unknown: [] };
});

// Track whether help has been displayed
before(program, 'outputHelp', function () {
  this._helpShown = true;
});

// Show help on unknown options and suppress the error if help was already displayed
before(program, 'unknownOption', function () {
  this._allowUnknownOption = this._helpShown;

  if (!this._helpShown) {
    program.outputHelp();
  }
});

// Define CLI options and parse command-line arguments
program
  .name('express-sweet')
  .version(version)
  .usage('[options] [dir]')
  .option('-o, --output <output>', 'add output <module> support (esm|cjs) (defaults to cjs)')
  .option('-f, --force', 'force on non-empty directory')
  .argument('[dir]', 'directory to create the app in')
  .parse(process.argv);

// Run main only if the process has not already been terminated by async I/O
if (!gracefulExit.exited) {
  main();
}
