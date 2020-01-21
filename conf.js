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
    'spec/firstSpec.js', 
    'spec/secondSpec.js', 
    'spec/thirdSpec.js', 
    'spec/fourthSpec.js', 
    'spec/fifthSpec.js', 
    'spec/sixthSpec.js', 
  ], 
  SELENIUM_PROMISE_MANAGER: false,
    jasmineNodeOpts: {
      defaultTimeoutInterval: 25000
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