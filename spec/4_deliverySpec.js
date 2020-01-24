const {startPage} = require('../pages/startPage'),
  {regionSelectionPage} = require('../pages/regionSelectionPage'),
  {errors} = require('./specData');

let regionSelectionTitle = 'Первый Каталог :: Выбор региона и вида доставки - Покупателям';

describe(`1k.by shop's delivery check.`,() => {

    it(` Region selection page's title should be equal to ${regionSelectionTitle} (1)`,
        async () => {
      await startPage.open();
      await startPage.goToRegionSelection();
      expect(browser.getTitle()).toEqual(regionSelectionTitle);
    });

    it(` Delivery page should display an error when choosing zero delivery types (2-3)`, 
      async () => {
        await regionSelectionPage.selectAdressInfo(
            regionSelectionPage.regions.minsk, regionSelectionPage.cities.logoisk);
        await regionSelectionPage.selectDeliveryType(regionSelectionPage.deliveryTypes.courier);
        await regionSelectionPage.selectDeliveryType(regionSelectionPage.deliveryTypes.mail);
        await regionSelectionPage.selectDeliveryType(regionSelectionPage.deliveryTypes.pickup);
        await regionSelectionPage.saveChanges();
        (await regionSelectionPage.getAllErrors()).includes(errors.wrongDellivery);
    });

    it(` Start page's delivery adress should be displayed correctly (4-5)`, async () => {
        await regionSelectionPage.selectDeliveryType(regionSelectionPage.deliveryTypes.courier);
        await regionSelectionPage.saveChanges();
        expect(startPage.getRegionValue()).toEqual(regionSelectionPage.cities.logoisk);
    });

    it(` Adress page should contain containt delivery adress type ${regionSelectionPage.deliveryTypes.courier} (6)`,
     async () => {
        await startPage.goToRegionSelection();
        expect(regionSelectionPage.isDeliveryTypeChecked(regionSelectionPage.deliveryTypes.courier))
            .toEqual(true);
    });
  });