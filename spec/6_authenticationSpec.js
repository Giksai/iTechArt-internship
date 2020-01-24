const {startPage} = require('../pages/startPage'),
  {authPage} = require('../pages/authPage'),
  {passwordRestorePage} = require('../pages/passwordRestorePage'),
  {errors} = require('./specData');

let auth_correctEmail = 'email@email.email',
    authFormInputText = '1';

describe(`1k.by shop's authentication check.`,() => {

    it(` Main page's authentication menu should drop (1)`,
      async () => {
        await startPage.open();
        await startPage.openAuthMenu();
        expect(startPage.isAuthMenuOpened()).toEqual(true);
    });

    it(` Authentication page should display errors on wrong field input (all of them) (2-3)`,
      async () => {
        await startPage.goToAuthentication(startPage.authTypes.login);
        await authPage.enterTextInForm(authPage.formTypes.email, authFormInputText);
        await authPage.enterTextInForm(authPage.formTypes.password, authFormInputText);
        await authPage.enterTextInForm(authPage.formTypes.captcha, authFormInputText);
        await authPage.saveChanges();
        let allErrors = await authPage.getAllErrors();
        expect(allErrors).toContain(errors.wrongCaptcha);
        expect(allErrors).toContain(errors.wrongEmail);
        expect(allErrors).toContain(errors.wrongPassword);
    });

    it(` Password restore page should display error on wrong captcha's text input (4-5)`,
      async () => {
        await authPage.clickRestorePassord();
        await passwordRestorePage.enterTextInForm(
              passwordRestorePage.formTypes.email, auth_correctEmail);
        await passwordRestorePage.enterTextInForm(
              passwordRestorePage.formTypes.captcha, authFormInputText);
        await passwordRestorePage.saveChanges();
        let allErrors = await passwordRestorePage.getAllErrors();
        expect(allErrors).toContain(errors.wrongCaptcha);
        expect(allErrors).not.toContain(errors.wrongEmail);
    });

    it(` Password restore page should display errors on wrong field input (all of them) (6)`,
      async () => {
        await browser.navigate().refresh();
        await passwordRestorePage.enterTextInForm(
            passwordRestorePage.formTypes.email, authFormInputText);
        await passwordRestorePage.enterTextInForm(
            passwordRestorePage.formTypes.captcha, authFormInputText);
        await passwordRestorePage.saveChanges();
        let allErrors = await passwordRestorePage.getAllErrors();
        expect(allErrors).toContain(errors.wrongEmail);
        expect(allErrors).toContain(errors.wrongCaptcha);
    });
  });