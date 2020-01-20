// conf.js
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
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
  }