const {startPage} = require('../pages/startPage'),
  {catalogPage} = require('../pages/catalogPage'),
  {productsPage} = require('../pages/productsPage');

let compareAmount = 2,
    productType_Bicycle = 'Велосипеды',
    catalog_sportAndTourism = 'Спорт и туризм',
    sortType_Price_Descending = 'цене начать с дорогих';

describe(`1k.by shop's products sorting and comparing check.`,() => {
  
    it(` Catalog page's title should contain ${catalog_sportAndTourism} (1)`,async () => {
      await startPage.open();
      await startPage.navigateToProductType(catalog_sportAndTourism);
      expect(browser.getTitle()).toContain(catalog_sportAndTourism);
    });

    it(` Catalog's page products's prices should be sorted decreasingly (2-3)`,async () => {
      await catalogPage.goToSection(productType_Bicycle);
      await productsPage.sort(productsPage.selectors.sortType(sortType_Price_Descending));
      let allPrices = (await productsPage.getProductPrices());
      let prevPrice = allPrices[0];
      for(let price of allPrices) {
          expect(price).not.toBeGreaterThan(prevPrice);
          prevPrice = price;
      }
    });

    it(` Comparison block should display ${compareAmount} products (4)`, async () => {
      await productsPage.setProductToCompare(0);
      await productsPage.setProductToCompare(1);
      expect(productsPage.getCompareProductsAmount()).toEqual(compareAmount);
    });

    it(` Compare page should display correct product names and prices (5)`, async () => {
        let productPrices = await productsPage.getProductPrices();
        let productNames = await productsPage.getTextOfElements(productsPage.selectors.productNames);
        await productsPage.goToComparePage();
        let comparePrices = await productsPage.getComparePrices();
        let compareNames = await productsPage.getTextOfElements(productsPage.selectors.compareNames);
        expect(compareNames[1]).toContain(productNames[0]);
        expect(compareNames[0]).toContain(productNames[1]);
        expect(comparePrices[1]).toEqual(productPrices[0]);
        expect(comparePrices[0]).toEqual(productPrices[1]);
    });
  });