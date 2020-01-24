  const argv = require('yargs').argv,
    log4js = require('./loggerConfig/loggerConfigurator'),
    logger = log4js.getLogger('default');

let currentBrowser = 'chrome';
if (argv.browser !== undefined) { //Check browser
  currentBrowser = argv.browser;
}

let addScreenShots = new function () {
    this.specDone = function (result) {        
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
            });
    };
}

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
  'browserName': currentBrowser,
	},
  specs: [
    'spec/1_vendorSpec.js', 
    'spec/2_sorting&comparisonSpec.js', 
    'spec/3_articleSpec.js', 
    'spec/4_deliverySpec.js', 
    'spec/5_siteVersionSpec.js', 
    'spec/6_authenticationSpec.js', 
  ], 
  SELENIUM_PROMISE_MANAGER: false,
    jasmineNodeOpts: {
      defaultTimeoutInterval: 50000
    },
  onPrepare: function() {
	browser.waitForAngularEnabled(false);
    let AllureReporter = require('jasmine-allure-reporter');
	jasmine.getEnv().addReporter(addScreenShots);
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));
  },
      beforeLaunch: () => {
        logger.trace('Tests started.');
    },
    onComplete: () => {
        logger.trace('Tests ended');
    }
};