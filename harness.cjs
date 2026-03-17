/**
 * AutoTest Harness - Node.js/TypeScript Version
 * 
 * Runs unit tests (Vitest) and browser tests (Playwright) against a Vite/React app.
 * 
 * Usage:
 *     node harness.js
 *     node harness.js --baseline
 *     node harness.js --test-type unit|browser|both
 */

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = __dirname;
const RESULTS_PATH = path.join(PROJECT_ROOT, 'results.tsv');
const LOG_DIR = path.join(PROJECT_ROOT, 'logs');

// Config
const CONFIG = {
  unitWeight: 0.5,
  browserWeight: 0.5,
  timeBudgetSeconds: 180,
  serverPort: 5173,
  serverStartupWait: 5,
};

function log(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`);
}

function checkRequiredFiles() {
  const requiredFiles = [
    'package.json',
    'src/store/gameStore.ts',
    'src/data/parts.ts',
    'src/data/missions.ts',
  ];
  
  const missing = [];
  for (const file of requiredFiles) {
    const fullPath = path.join(PROJECT_ROOT, file);
    if (!fs.existsSync(fullPath)) {
      missing.push(file);
    }
  }
  
  if (missing.length > 0) {
    console.error('\n❌ Missing required files:');
    for (const file of missing) {
      console.error(`   - ${file}`);
    }
    console.error('\n⚠️  Please commit all source files to git before running:');
    console.error('   git add -A');
    console.error('   git commit -m "Add source files"\n');
    return false;
  }
  
  // Check for uncommitted changes (source files should always be committed)
  try {
    const status = execSync('git status --porcelain', { cwd: PROJECT_ROOT, encoding: 'utf-8' });
    const untracked = status.match(/^\?\?/gm);
    if (untracked && untracked.length > 0) {
      console.error('\n❌ ERROR: You have uncommitted source files!');
      console.error('Source files must be committed before running experiments.');
      console.error('Run: git add -A && git commit -m "Add source files"');
      console.error('\n⚠️  WARNING: If you run experiments without committing,');
      console.error('   a git reset will delete your files forever!\n');
      return false;
    }
  } catch (e) {
    // Not a git repo - that's ok for local dev
  }
  
  return true;
}

function isPortOpen(port) {
  const net = require('net');
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => resolve(false));
    socket.connect(port, 'localhost');
  });
}

async function waitForServer(port, timeout = 10) {
  const start = Date.now();
  while (Date.now() - start < timeout * 1000) {
    if (await isPortOpen(port)) return true;
    await new Promise(r => setTimeout(r, 500));
  }
  return false;
}

function startDevServer() {
  log('Starting Vite dev server...');
  const proc = spawn('npm', ['run', 'dev'], {
    cwd: PROJECT_ROOT,
    stdio: 'pipe',
    shell: true,
    env: { ...process.env, FORCE_COLOR: '1' }
  });
  return proc;
}

function stopServer(proc) {
  if (proc) {
    log('Stopping server...');
    proc.kill('SIGTERM');
    setTimeout(() => {
      if (!proc.killed) proc.kill('SIGKILL');
    }, 3000);
  }
}

async function runUnitTests() {
  log('Running unit tests with Vitest...');
  const startTime = Date.now();
  
  try {
    execSync('npm run test:coverage', {
      cwd: PROJECT_ROOT,
      stdio: 'pipe',
      timeout: CONFIG.timeBudgetSeconds * 1000,
    });
    
    const output = execSync('npm run test:coverage', {
      cwd: PROJECT_ROOT,
      encoding: 'utf-8',
    });
    
    // Parse coverage from output - multiple formats
    let coverage = 0;
    const lines = output.split('\n');
    for (const line of lines) {
      if (line.includes('All files')) {
        const match = line.match(/All files\s*\|\s*([\d.]+)/);
        if (match) {
          coverage = parseFloat(match[1]);
          break;
        }
      }
    }
    
    const duration = (Date.now() - startTime) / 1000;
    
    return {
      coverage,
      passCount: 1,
      failCount: 0,
      passRate: 100,
      durationSeconds: duration,
      rawOutput: output,
    };
  } catch (err) {
    const duration = (Date.now() - startTime) / 1000;
    return {
      coverage: 0,
      passCount: 0,
      failCount: 1,
      passRate: 0,
      durationSeconds: duration,
      rawOutput: err.message,
    };
  }
}

async function runBrowserTests() {
  log('Running browser tests with Playwright...');
  const startTime = Date.now();
  
  try {
    const output = execSync('npx playwright test --reporter=line', {
      cwd: PROJECT_ROOT,
      encoding: 'utf-8',
      timeout: CONFIG.timeBudgetSeconds * 1000,
    });
    
    const passMatch = output.match(/(\d+) passed/);
    const failMatch = output.match(/(\d+) failed/);
    
    const passCount = passMatch ? parseInt(passMatch[1]) : 0;
    const failCount = failMatch ? parseInt(failMatch[1]) : 0;
    const total = passCount + failCount;
    const passRate = total > 0 ? (passCount / total) * 100 : 0;
    
    const duration = (Date.now() - startTime) / 1000;
    
    return {
      passCount,
      failCount,
      passRate,
      durationSeconds: duration,
      rawOutput: output,
    };
  } catch (err) {
    const output = err.stdout || err.message;
    const passMatch = output.match(/(\d+) passed/);
    const failMatch = output.match(/(\d+) failed/);
    
    const passCount = passMatch ? parseInt(passMatch[1]) : 0;
    const failCount = failMatch ? parseInt(failMatch[1]) : 0;
    const total = passCount + failCount;
    const passRate = total > 0 ? (passCount / total) * 100 : 0;
    
    const duration = (Date.now() - startTime) / 1000;
    
    return {
      passCount,
      failCount,
      passRate,
      durationSeconds: duration,
      rawOutput: output,
    };
  }
}

function calculateScore(unitResult, browserResult) {
  return CONFIG.unitWeight * (unitResult.coverage || 0) + 
         CONFIG.browserWeight * (browserResult.passRate || 0);
}

function getLastScore() {
  if (!fs.existsSync(RESULTS_PATH)) return 0;
  
  const lines = fs.readFileSync(RESULTS_PATH, 'utf-8').split('\n');
  if (lines.length <= 1) return 0;
  
  const lastLine = lines[lines.length - 1].trim();
  if (!lastLine || lastLine.startsWith('commit')) return 0;
  
  const parts = lastLine.split('\t');
  return parts.length >= 4 ? parseFloat(parts[3]) || 0 : 0;
}

function getCurrentCommit() {
  try {
    const hash = execSync('git rev-parse --short HEAD', {
      cwd: PROJECT_ROOT,
      encoding: 'utf-8',
    }).trim();
    return hash.substring(0, 7);
  } catch {
    return 'unknown';
  }
}

function initResultsFile() {
  if (!fs.existsSync(RESULTS_PATH)) {
    fs.writeFileSync(RESULTS_PATH, 'commit\tcoverage\tbrowser_pass\tscore\tstatus\tdescription\n');
  }
}

function logResult(result) {
  const line = `${result.commit}\t${result.coverage.toFixed(1)}\t${result.browserPassRate.toFixed(1)}\t${result.score.toFixed(1)}\t${result.status}\t${result.description}\n`;
  fs.appendFileSync(RESULTS_PATH, line);
}

async function runExperiment(description = 'autonomous test generation') {
  const baselineScore = getLastScore();
  const commit = getCurrentCommit();
  
  log(`Running experiment (baseline: ${baselineScore.toFixed(1)})...`);
  
  let serverProc = null;
  
  try {
    // Start dev server
    serverProc = startDevServer();
    
    // Wait for server to be ready
    const serverReady = await waitForServer(CONFIG.serverPort, CONFIG.serverStartupWait);
    if (!serverReady) {
      throw new Error(`Server failed to start on port ${CONFIG.serverPort}`);
    }
    log(`Server running on port ${CONFIG.serverPort}`);
    
    // Run browser tests first (requires server)
    const browserResult = await runBrowserTests();
    log(`  Browser pass rate: ${browserResult.passRate.toFixed(1)}%`);
    
    // Run unit tests
    const unitResult = await runUnitTests();
    log(`  Unit coverage: ${unitResult.coverage.toFixed(1)}%`);
    
    // Calculate score
    const score = calculateScore(unitResult, browserResult);
    log(`Combined score: ${score.toFixed(1)}`);
    
    const status = score > baselineScore ? 'keep' : 'discard';
    log(`Result: ${status === 'keep' ? 'IMPROVED (keep)' : 'No improvement (discard)'}`);
    
    return {
      commit,
      coverage: unitResult.coverage,
      browserPassRate: browserResult.passRate,
      score,
      status,
      description,
    };
    
  } catch (err) {
    log(`Experiment failed: ${err.message}`);
    return {
      commit,
      coverage: 0,
      browserPassRate: 0,
      score: 0,
      status: 'crash',
      description: err.message,
    };
  } finally {
    stopServer(serverProc);
  }
}

async function main() {
  initResultsFile();
  
  // Check for required files before running
  if (!checkRequiredFiles()) {
    process.exit(1);
  }
  
  const args = process.argv.slice(2);
  const testType = args.includes('--both') ? 'both' : 
                   args.includes('--unit') ? 'unit' :
                   args.includes('--browser') ? 'browser' : 'both';
  
  const description = args.find(a => !a.startsWith('--')) || 'autonomous test generation';
  
  log(`Starting AutoTest harness (${testType} tests)...`);
  
  const result = await runExperiment(description);
  logResult(result);
  
  log(`\nResults logged to ${RESULTS_PATH}`);
  log(`Status: ${result.status}, Score: ${result.score.toFixed(1)}`);
  
  process.exit(result.status === 'crash' ? 1 : 0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
