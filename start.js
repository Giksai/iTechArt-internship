const { exec } = require('child_process');
exec('node ./node_modules/protractor/bin/webdriver-manager start', (err, stdout, stderr) => {
  if (err) {
    console.error('Could not start webdriver server.');
  }
  console.log(`stdout: ${stdout}`);
  process.exit();
});
exec('node_modules\\.bin\\protractor conf.js', (err, stdout, stderr) => {
  if (err) {
    console.error('Error.');
  }
  console.log(`stdout: ${stdout}`);
  process.exit();
});