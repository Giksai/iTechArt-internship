const log4js = require('../loggerConfig/loggerConfigurator'),
    {BasePage} = require('./basePage');

const logger = log4js.getLogger('default');

const selectors = {
    articleHeadText: '//header[@class="post__head"]/h1',
    articleTextPart: '//div[@class="post__body u-ugc u-ugc--md"]/p',
    moreNewsBlock: '//div[@class="l-section__in"]/ul/li',
};

class ArticlePage extends BasePage {
    selectors = selectors

    async getHeaderText() {
        logger.debug(`getHeaderText: trying to get main text of the article.`);
        let headerText = await element(by.xpath(selectors.articleHeadText)).getText();
        logger.debug(`getHeaderText: header text: ${headerText}`);
        return headerText;
    }

    async getAllArticleText() {
        logger.debug(`getAllArticleText: trying to get full article text.`);
        let allText;
        for(let part of (await super.getTextOfElements(selectors.articleTextPart))) {
            allText += ' ' + part;
        }
        logger.debug(`getAllArticleText: full article text: ${allText}`);
        return allText;
    }

    async getArticlesAmount() {
        logger.debug(`getArticlesAmount: trying to get additional articles amount.`);
        let additionalArticles = await element.all(by.xpath(selectors.moreNewsBlock)).count();
        logger.debug(`getArticlesAmount: additional articles amount: ${additionalArticles}.`);
        return additionalArticles;
    }
};

module.exports = {
    articlePage: new ArticlePage()
};