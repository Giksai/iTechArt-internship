const {startPage} = require('../pages/startPage'),
  {aboutPage} = require('../pages/aboutPage'),
  {data} = require('./specData'),
  log4js = require('../loggerConfig/loggerConfigurator');

const logger = log4js.getLogger('default');

describe('1k.by shop',() => {
  beforeAll(() => {
    browser.waitForAngularEnabled(false);
  });
  
    it(`'s mobile version main page should contain desktop version switch button (1)`,
      async () => {
        await startPage.open();
        await startPage.switchCiteVersion(startPage.citeVersions.mobile);
        expect(startPage.isSwitchBtnAwailable(startPage.citeVersions.desktop))
            .toEqual(true);
    });

    it(`'s desktop version main page should contain mobile version switch button (2)`,
      async () => {
        await startPage.switchCiteVersion(startPage.citeVersions.desktop);
        expect(startPage.isSwitchBtnAwailable(startPage.citeVersions.mobile))
            .toEqual(true);
    });

    it(`'s footer section links should be correct (3)`,
      async () => {
        let bottomLinks = await startPage.getBottomFooterLinks();
        let topLinks = await startPage.getTopFooterLinks();
        for(let link of bottomLinks) {
            expect(link).toMatch(data.uriREGEX);
        }
        for(let link of topLinks) {
            expect(link).toMatch(data.uriREGEX);
        }
    });

    it(`'s about us page should contain ${data.aboutLinksAmount} links (4)`,
      async () => {
        startPage.clickOnBottomFooterLink(data.footerLinkText);
        expect(aboutPage.getAmountOfLinks()).toEqual(data.aboutLinksAmount);
    });


  });