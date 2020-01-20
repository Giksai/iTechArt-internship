const log4js = require('../loggerConfig/loggerConfigurator'),
    {BasePage} = require('./basePage');

const logger = log4js.getLogger('default');

const selectors = {
    aboutLinks: '//div[@class="b-content ugc_content"]/*/a',
};

class AboutPage extends BasePage {

    async getAmountOfLinks() {
        logger.debug(`getAmountOfLinks: trying to get amount of links from about page.`);
        let linksAmount = await elements(by.xpath(selectors.aboutLinks)).count();
        logger.debug(`getAmountOfLinks: got ${linksAmount} links.`);
        return linksAmount;
    }
};

module.exports = {
    aboutPage: new AboutPage()
};