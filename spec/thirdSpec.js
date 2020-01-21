const {startPage} = require('../pages/startPage'),
  {searchPage} = require('../pages/searchPage'),
  {articlePage} = require('../pages/articlePage'),
  {data} = require('./specData'),
  log4js = require('../loggerConfig/loggerConfigurator');

const logger = log4js.getLogger('default');

describe('1k.by shop',() => {

    it(`'s search page results amount, which contain word ${data.searchText}, should be greater or equal to ${data.compareSearchAmount} (1-2)`,async () => {
      await startPage.open();
      await startPage.selectSearchingParameter(startPage.searchingParameters.news);
      await startPage.searchFor(data.searchText);
      let searchResults = await searchPage.getTextOfElements(searchPage.selectors.newsTextBlock);
      let comparisonCount = 0;
      for(let result of searchResults) {
          if(result.includes(data.searchText)) {
              comparisonCount++;
          }
      }
      expect(comparisonCount).not.toBeLessThan(data.compareSearchAmount);
    });

    it(`'s article page displays correct header (3)`,async () => {
        let compareIndex = 3;
        let resultText = (await searchPage.getTextOfElements(searchPage.selectors.newsTextBlock))[compareIndex];
        await searchPage.goToArticle(compareIndex);
        expect(articlePage.getHeaderText()).toEqual(resultText);
    });

    it(`'s article page text consists of no less than 50 words (4)`,async () => {
        let allText = await articlePage.getAllArticleText();
        let words = allText.split(' ');
        logger.trace(`Words amount: ${words.length}`)
        expect(words.length).toBeGreaterThan(data.articleWordsAmount);
    });

    it(`'s article page additional articles amount equals to ${data.additionalArticlesAmount} (5)`,async () => {
        let articlesAmount = await articlePage.getArticlesAmount();
        logger.trace(`Articles amount: ${articlesAmount}`);
        expect(articlesAmount).toEqual(data.additionalArticlesAmount);
    });

  });