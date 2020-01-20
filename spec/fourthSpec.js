const {startPage} = require('../pages/startPage'),
  {regionSelectionPage} = require('../pages/regionSelectionPage'),
  {data, errors} = require('./specData'),
  log4js = require('../loggerConfig/loggerConfigurator');

const logger = log4js.getLogger('default');

describe('1k.by shop',() => {
  beforeAll(() => {
    browser.waitForAngularEnabled(false);
  });
  
    it(`'s region selection page's title should be equal to ${data.regionSelectionTitle} (1)`,
        async () => {
      await startPage.open();
      await startPage.goToRegionSelection();
      expect(browser.getTitle()).toEqual(data.regionSelectionTitle);
    });

    it(`'s delivery page should display an error when choosing zero delivery types (2-3)`, 
      async () => {
        await regionSelectionPage.selectAdressInfo(
            regionSelectionPage.regions.minsk, regionSelectionPage.cities.logoisk);
        await regionSelectionPage.selectDeliveryType(regionSelectionPage.deliveryTypes.courier);
        await regionSelectionPage.selectDeliveryType(regionSelectionPage.deliveryTypes.mail);
        await regionSelectionPage.selectDeliveryType(regionSelectionPage.deliveryTypes.pickup);
        await regionSelectionPage.saveChanges();
        (await regionSelectionPage.getAllErrors()).includes(errors.wrongDellivery);
    });

    it(`'s start page's delivery adress should be displayed correctly (4-5)`, async () => {
        await regionSelectionPage.selectDeliveryType(regionSelectionPage.deliveryTypes.courier);
        await regionSelectionPage.saveChanges();
        expect(startPage.getRegionValue()).toEqual(regionSelectionPage.cities.logoisk);
    });

    it(`'s adress page should contain containt delivery adress type ${regionSelectionPage.deliveryTypes.courier} (6)`,
     async () => {
        await startPage.goToRegionSelection();
        expect(regionSelectionPage.isDeliveryTypeChecked(regionSelectionPage.deliveryTypes.courier))
            .toEqual(true);
    });

  });