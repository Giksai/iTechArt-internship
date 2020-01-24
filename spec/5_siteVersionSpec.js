const {startPage} = require('../pages/startPage'),
  {aboutPage} = require('../pages/aboutPage'),
  {data} = require('./specData');

let aboutLinksAmount = 10,
    footerLinkText = 'О нас';

describe(`1k.by shop's site version check.`,() => {

    it(` Mobile version main page should contain desktop version switch button (1)`,
      async () => {
        await startPage.open();
        await startPage.switchCiteVersion(startPage.citeVersions.mobile);
        expect(startPage.isSwitchBtnAwailable(startPage.citeVersions.desktop))
            .toEqual(true);
    });

    it(` Desktop version main page should contain mobile version switch button (2)`,
      async () => {
        await startPage.switchCiteVersion(startPage.citeVersions.desktop);
        expect(startPage.isSwitchBtnAwailable(startPage.citeVersions.mobile))
            .toEqual(true);
    });

    it(` Footer section links should be correct (3)`,
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

    it(` About us page should contain ${aboutLinksAmount} links (4)`,
      async () => {
        startPage.clickOnBottomFooterLink(footerLinkText);
        expect(aboutPage.getAmountOfLinks()).toEqual(aboutLinksAmount);
    });
  });