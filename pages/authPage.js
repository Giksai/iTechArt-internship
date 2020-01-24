const log4js = require('../loggerConfig/loggerConfigurator'),
    {BasePage} = require('./basePage');

const logger = log4js.getLogger('default');

const selectors = {
    restorePassword: '//a[text()="Восстановить пароль"]',
    formInputField: (type) => `//input[@class="text form_inp" and @name="${type}"]`,
};
const formTypes = {
    email: 'email',
    password: 'password',
    captcha: 'confirmationcode',
};

class AuthPage extends BasePage {
    formTypes = formTypes

    async enterTextInForm(formType, text) {
        logger.debug(`enterTextInForm: trying to enter text: (${text}) in form: (${formType}).`);
        await super.enterText(selectors.formInputField(formType), text);
    }

    async clickRestorePassord() {
        logger.debug(`clickRestorePassord: trying to click on restore password button.`);
        await super.clickOnElement(selectors.restorePassword);
    }
};

module.exports = {
    authPage: new AuthPage()
};