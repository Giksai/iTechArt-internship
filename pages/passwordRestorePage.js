const log4js = require('../loggerConfig/loggerConfigurator'),
    {BasePage} = require('./basePage');

const logger = log4js.getLogger('default');

const selectors = {
    formInputField: (type) => `//input[@class="text form_inp" and @name="${type}"]`,
};
const formTypes = {
    email: 'email',
    captcha: 'confirmationcode',
};

class PasswordRestorePage extends BasePage {
    formTypes = formTypes

    async enterTextInForm(formType, text) {
        logger.debug(`enterTextInForm: trying to enter text: ${text} in: ${formType} form.`);
        await super.enterText(selectors.formInputField(formType), text);
    }
};

module.exports = {
    passwordRestorePage: new PasswordRestorePage()
};