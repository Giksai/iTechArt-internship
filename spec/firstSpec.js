const {startPage} = require('../pages/startPage'),
  {catalogPage} = require('../pages/catalogPage'),
  {productsPage} = require('../pages/productsPage'),
  {data} = require('./specData'),
  log4js = require('../loggerConfig/loggerConfigurator');

const logger = log4js.getLogger('default');

describe('1k.by shop', () => {
  beforeAll(() => {
    browser.waitForAngularEnabled(false);
  });

    it(`\'s catalog page\'s title should contain ${data.catalog_householdEquipment} (1)`,async () => {
      await startPage.open();
      await startPage.navigateToProductType(data.catalog_householdEquipment);
      expect(browser.getTitle()).toContain(data.catalog_householdEquipment);
    });

    it('\'s product page should contain it\'s description (2)',async () => {
      await catalogPage.goToSection('Микроволновые печи');
      expect(browser.getTitle()).toContain(data.productType_Microwaves);
    });

    it('\'s products page should only show products with vendor "Samsung" (3-4)',async () => {
      await productsPage.selectVendor(data.vendor_Samsung);
      await productsPage.submit();
      expect(productsPage.getSearchParameterValue(productsPage.searchParameters.vendors)).toEqual(data.vendor_Samsung);
    });
  });