const {startPage} = require('../pages/startPage'),
  {catalogPage} = require('../pages/catalogPage'),
  {productsPage} = require('../pages/productsPage');

let productType_Microwaves = 'Микроволновые печи',
    vendor_Samsung = 'Samsung',
    catalog_householdEquipment = 'Бытовая техника';

describe(`1k.by shop's vendor searching parameter check.`, () => {

    it(` Catalog page\'s title should contain ${catalog_householdEquipment} (1)`,async () => {
      await startPage.open();
      await startPage.navigateToProductType(catalog_householdEquipment);
      expect(browser.getTitle()).toContain(catalog_householdEquipment);
    });

    it(` Product page should contain description ${productType_Microwaves} (2)`,async () => {
      await catalogPage.goToSection('Микроволновые печи');
      expect(browser.getTitle()).toContain(productType_Microwaves);
    });

    it(` Products page should only show products with vendor ${vendor_Samsung} (3-4)`,async () => {
      await productsPage.selectVendor(vendor_Samsung);
      await productsPage.submit();
      expect(productsPage.getSearchParameterValue(productsPage.searchParameters.vendors)).toEqual(vendor_Samsung);
    });
  });