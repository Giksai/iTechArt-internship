const log4js = require('../loggerConfig/loggerConfigurator'),
    {BasePage} = require('./basePage');

const logger = log4js.getLogger('default');

const selectors = {
    productTypeBlock: (type) => {
        return `//ul[@class="category__items"]/li/a[span="${type}"]`;
    }
};

class CatalogPage extends BasePage {
    async goToSection(section) {
        logger.debug(`goToSection: trying to navigate to section: ${section} in catalog page`);
        await super.clickOnElement(selectors.productTypeBlock(section));
    }
};

module.exports = {
    catalogPage: new CatalogPage()
};
