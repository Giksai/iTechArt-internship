const {startPage} = require('../pages/startPage'),
  {searchPage} = require('../pages/searchPage'),
  {articlePage} = require('../pages/articlePage'),
  log4js = require('../loggerConfig/loggerConfigurator');

const logger = log4js.getLogger('default');

let searchText = 'Беларусь',
    compareSearchAmount = 5,
    articleWordsAmount = 50,
    additionalArticlesAmount = 6;

describe(`1k.by shop's news searching check.`,() => {

    it(` Search page results amount, which contain word ${searchText}, should be greater or equal to ${compareSearchAmount} (1-2)`,async () => {
      await startPage.open();
      await startPage.selectSearchingParameter(startPage.searchingParameters.news);
      await startPage.searchFor(searchText);
      let searchResults = await searchPage.getTextOfElements(searchPage.selectors.newsTextBlock);
      let comparisonCount = 0;
      for(let result of searchResults) {
          if(result.includes(searchText)) {
              comparisonCount++;
          }
      }
      expect(comparisonCount).not.toBeLessThan(compareSearchAmount);
    });

    it(` Article page displays correct header (3)`,async () => {
        let compareIndex = 3;
        let resultText = (await searchPage.getTextOfElements(searchPage.selectors.newsTextBlock))[compareIndex];
        await searchPage.goToArticle(compareIndex);
        expect(articlePage.getHeaderText()).toEqual(resultText);
    });

    it(` Article page text consists of no less than ${articleWordsAmount} words (4)`,async () => {
        let allText = await articlePage.getAllArticleText();
        let words = allText.split(' ');
        logger.trace(`Words amount: ${words.length}`)
        expect(words.length).toBeGreaterThan(articleWordsAmount);
    });

    it(` Article page additional articles amount equals to ${additionalArticlesAmount} (5)`,async () => {
        let articlesAmount = await articlePage.getArticlesAmount();
        logger.trace(`Articles amount: ${articlesAmount}`);
        expect(articlesAmount).toEqual(additionalArticlesAmount);
    });
  });