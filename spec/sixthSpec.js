const {startPage} = require('../pages/startPage'),
  {authPage} = require('../pages/authPage'),
  {passwordRestorePage} = require('../pages/passwordRestorePage'),
  {data, errors} = require('./specData'),
  log4js = require('../loggerConfig/loggerConfigurator');

const logger = log4js.getLogger('default');

describe('1k.by shop',() => {

    it(`'s main page's authentication menu should drop (1)`,
      async () => {
        await startPage.open();
        await startPage.openAuthMenu();
        expect(startPage.isAuthMenuOpened()).toEqual(true);
    });

    it(`'s authentication page should display errors on wrong field input (all of them) (2-3)`,
      async () => {
        await startPage.goToAuthentication(startPage.authTypes.login);
        await authPage.enterTextInForm(authPage.formTypes.email, data.authFormInputText);
        await authPage.enterTextInForm(authPage.formTypes.password, data.authFormInputText);
        await authPage.enterTextInForm(authPage.formTypes.captcha, data.authFormInputText);
        await authPage.saveChanges();
        let allErrors = await authPage.getAllErrors();
        expect(allErrors).toContain(errors.wrongCaptcha);
        expect(allErrors).toContain(errors.wrongEmail);
        expect(allErrors).toContain(errors.wrongPassword);
    });

    it(`'s password restore page should display error on wrong captcha's text input (4-5)`,
      async () => {
        await authPage.clickRestorePassord();
        await passwordRestorePage.enterTextInForm(
              passwordRestorePage.formTypes.email, data.auth_correctEmail);
        await passwordRestorePage.enterTextInForm(
              passwordRestorePage.formTypes.captcha, data.authFormInputText);
        await passwordRestorePage.saveChanges();
        let allErrors = await passwordRestorePage.getAllErrors();
        expect(allErrors).toContain(errors.wrongCaptcha);
        expect(allErrors).not.toContain(errors.wrongEmail);
    });

    it(`'s password restore page should display errors on wrong field input (all of them) (6)`,
      async () => {
        await browser.navigate().refresh();
        await passwordRestorePage.enterTextInForm(
            passwordRestorePage.formTypes.email, data.authFormInputText);
        await passwordRestorePage.enterTextInForm(
            passwordRestorePage.formTypes.captcha, data.authFormInputText);
        await passwordRestorePage.saveChanges();
        let allErrors = await passwordRestorePage.getAllErrors();
        expect(allErrors).toContain(errors.wrongEmail);
        expect(allErrors).toContain(errors.wrongCaptcha);

    });

  });