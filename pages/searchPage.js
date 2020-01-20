const log4js = require('../loggerConfig/loggerConfigurator'),
    {BasePage} = require('./basePage');

const logger = log4js.getLogger('default');

const selectors = {
    newsTextBlock: '//a[@class="preview__link"]',
};

class SearchPage extends BasePage {
    selectors = selectors
    
    async goToArticle(index) {
        logger.debug(`goToArticle: going to artcle: ${index}.`);
        await super.clickOnElementByIndex(selectors.newsTextBlock, index);
    }
};

module.exports = {
    searchPage: new SearchPage()
};