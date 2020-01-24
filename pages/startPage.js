const log4js = require('../loggerConfig/loggerConfigurator'),
    {BasePage} = require('./basePage');

const logger = log4js.getLogger('default');

const selectors = {
    productsCatalog: '//nav/div[@class="menu__link menu__catalog"]',
    searchBox: '//label[@class="search__field"]/input',
    searchButton: `//button[@class="search__submit"]`,
    regionButton: `//a[@class="auth__region"]`,
    regionButtonText: `//a[@class="auth__region"]/span`,
    authButton: '//div[@class="auth__user"]',
    authSelectionElement: (authType) => `//nav[@class="auth__menu"]/a[text()="${authType}"]`,
    searchingParameters: (parameter) => `//select[@name="searchFor"]//option[@value="${parameter}"]`,
    productsCatalogItem: (element) => `//div[@class="menu__cat-drop"]/a[span="${element}"]`,
};
const adress = 'https://1k.by/';
const searchingParameters = {
    news: 'news',
};
const authTypes = {
    login: 'Войти',
    register: 'Регистрация',
};

class StartPage extends BasePage {
    selectors = selectors
    searchingParameters = searchingParameters
    authTypes = authTypes

    async navigateToProductType(type) {
        logger.debug(`navigateToProductType: trying to navigate to product type: ${type}.`)
        await super.clickOnElement(selectors.productsCatalog);
        await super.clickOnElement(selectors.productsCatalogItem(type));
    }

    async selectSearchingParameter(parameter) {
        logger.debug(`selectSearchingParameter: selecting searching parameter: ${parameter}.`);
        await super.clickOnElement(selectors.searchingParameters(parameter));
    }

    async goToRegionSelection() {
        logger.debug(`goToRegionSelection: going to region selection.`);
        await super.clickOnElement(selectors.regionButton);
    }

    async openAuthMenu() {
        logger.debug(`openAuthMenu: opening authentication menu.`);
        await super.clickOnElement(selectors.authButton);
    }

    async goToAuthentication(authType) {
        logger.debug(`goToAuthentication: navigating to auth page`);
        await super.clickOnElement(selectors.authSelectionElement(authType));
    }

    async isAuthMenuOpened() {
        logger.debug(`isAuthMenuOpened: checking whether auth menu is dropped.`);
        let isDropped = (await element(by.xpath(selectors.authButton)).getAttribute('class'))
            === 'auth__user auth__user--opened';
        logger.debug(`isAuthMenuOpened: ${isDropped}.`);
        return isDropped;
    }

    async getRegionValue() {
        logger.debug(`getRegionValue: trying to get current region value.`);
        let region = await element(by.xpath(selectors.regionButtonText)).getText();
        logger.debug(`getRegionValue: region: ${region}.`);
        return region;
    }

    async searchFor(text) {
        logger.debug(`searchFor: trying to search for: ${text}.`);
        await super.enterText(selectors.searchBox, text);
        await super.clickOnElement(selectors.searchButton);
    }

    async open() {
        await super.open(adress);
    }
};

module.exports = {
    startPage: new StartPage()
};