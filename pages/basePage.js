const log4js = require('../loggerConfig/loggerConfigurator');

const logger = log4js.getLogger('default');

const selectors = {
    error: '//div[@class="error c-red"]',
    bottomFooterLinks: '//a[@class="misc-nav__it"]',
    topFooterLinks: '//a[@class="app-nav__link"]',
    submitBtn: '//input[@id="submit"]',
    bottomFooterLinksByText: (text) => {
        return `//a[text()="${text}"]`;
    },
    switchCiteVersionBtn: (version) => {
        return `//a[@class="${version}"]`;
    },
};

const citeVersions = {
    mobile: 'app-socials__mobile',
    desktop: 'misc_it i-desk',
};

class BasePage {
    citeVersions = citeVersions

    async open(uri) {
        logger.debug(`open: opening page: ${uri}.`);
        await browser.get(uri);
    }

    async switchCiteVersion(version) {
        logger.debug(`switchCiteVersion: trying to switch cite version to: ${version}`);
        await this.clickOnElement(selectors.switchCiteVersionBtn(version));
        logger.debug(`switchCiteVersion: switched successfully.`);
    }
    async isSwitchBtnAwailable(version) {
        logger.debug(`isSwitchBtnAwailable: trying to determine whether cite version switch button is available.`);
        let isAwailable = await element(by.xpath(selectors.switchCiteVersionBtn(version))).isPresent();
        logger.debug(`isSwitchBtnAwailable: awailable: ${isAwailable}.`);
        return isAwailable;
    }

    async getTopFooterLinks() {
        logger.debug(`getTopFooterLinks: trying to get link texts of upper footer links.`);
        let upperLinks = await this.getLinksOfElements(selectors.topFooterLinks);
        logger.debug(`getTopFooterLinks: upper links: ${upperLinks}.`);
        return upperLinks;
    }
    async getBottomFooterLinks() {
        logger.debug(`getBottomFooterLinks: trying to get link texts of bottom footer links.`);
        let bottomLinks = await this.getLinksOfElements(selectors.bottomFooterLinks);
        logger.debug(`getBottomFooterLinks: upper links: ${bottomLinks}.`);
        return bottomLinks;
    }
    async clickOnBottomFooterLink(linkText) {
        logger.debug(`clickOnBottomFooterLink: trying to click on footer link by its link text: ${linkText}.`);
        await this.clickOnElement(selectors.bottomFooterLinksByText(linkText));
    }

    async saveChanges() {
        logger.debug(`saveChanges: saving changes.`);
        await this.clickOnElement(selectors.submitBtn);
    }

    async getTextOfElements(selector, textConversionMethod) {
        logger.debug(`getTextOfElements: Trying to get text of elements with selector: (${selector}), 
        using converter function: (${textConversionMethod ? 'true' : 'false'}).`);
        let foundElements = [];
        let allElements = await element.all(by.xpath(selector));
        logger.debug(`getTextOfElements: Amount of found elements: ${allElements.length}`);
            for(let elem of allElements) {
                    if(textConversionMethod) {
                        foundElements.push(textConversionMethod(await elem.getText()));
                    } else {
                        foundElements.push(await elem.getText());
                    }
            }

        logger.debug(`getTextOfElements: Found elements's texts: (${foundElements}).`);
        return foundElements;
    }
    async getLinksOfElements(selector) {
        logger.debug(`getLinksOfElements: Trying to get link texts of elements with selector: (${selector}).`);
        let foundElements = [];
        let allElements = await element.all(by.xpath(selector));
        logger.debug(`getLinksOfElements: Amount of found elements: ${allElements.length}`);
            for(let elem of allElements) {
                foundElements.push(await elem.getAttribute('href'));
            }

        logger.debug(`getLinksOfElements: Found elements's links: (${foundElements}).`);
        return foundElements;
    }

    async enterText(selector, text) {
        logger.debug(`enterText: trying to enter text: ${text} in a form: ${selector}.`);
        await element(by.xpath(selector)).sendKeys(text);
    }

    async waitForElement(selector, waitingTime = 10000) {
        logger.debug(`waitForElement: waiting: ${waitingTime} for element: ${selector} to appear.`);
        const until = protractor.ExpectedConditions;
        await browser.wait(until.presenceOf(element(by.xpath(selector))), waitingTime, 'Element is taking too long to appear in the DOM');
    }

    async getAllErrors() {
        logger.debug(`getAllErrors: trying to get all errors from page.`);
        await this.waitForElement(selectors.error);
        let allText;
        let allErrorsText = await this.getTextOfElements(selectors.error);
        for(let error of allErrorsText) {
            allText += error + ' ';
        }
        logger.debug(`getAllErrors: got errors: ${allText}.`);
        return allText;
    }

    async clickOnElementByIndex(selector, index) {
        logger.debug(`clickOnElement: Trying to click on element: (${selector}) with index: (${index}).`);
        await (await element.all(by.xpath(selector)))[index].click();
    }
    async clickOnElement(selector) {
        logger.debug(`clickOnElement: Trying to click on element: (${selector}).`);
        await element(by.xpath(selector)).click();
    }

};

module.exports = {
    BasePage: BasePage
};