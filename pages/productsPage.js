const log4js = require('../loggerConfig/loggerConfigurator'),
    {BasePage} = require('./basePage');

const logger = log4js.getLogger('default');

const selectors = {
    vendors: (vendor) => {
        return `//div[@class="f-vendors__it"]/label/img[@alt="${vendor}"]/..`;
    },
    submitBtn: '//button[@type="submit"]',
    productNames: '//div[@class="l-columns__main"]//a[@class="prod__link"]',
    productsPrices: '//a[@class="money__val"]',
    compareCheckBox:  `//label[@class="cbx cbx--md"]/input[@name="compareproductsids"]`,
    compareButton: `//button[@class="compare-btn__main"]`,
    compareNames: `//span[@class="spec-compare__link"]`,
    comparePrices: `//a[@class="spec-compare__price"]`,
    searchParameter: (parameter) => {
        return `//div[@id="paramslider"]/button[@data-sliderparameterid="${parameter}"]`;
    },
    sortType: (sortingType) => {
        return `//select[@name="order"]/option[text()="${sortingType}"]`;
    },

};

//value of data-sliderparameterid attribute
const searchParameters = {
    vendors: 'producers',
    price: 'price'
};

class ProductsPage extends BasePage {
    searchParameters = searchParameters;
    selectors = selectors;

    async selectVendor(vendor) {
        logger.debug(`selectVendor: trying to select vendor: ${vendor} in catalog page.`);
        await super.clickOnElement(selectors.vendors(vendor));
    }

    async submit() {
        logger.debug(`submit: trying to apply search parameters in catalog page.`);
        await super.clickOnElement(selectors.submitBtn);
    }

    async getSearchParameterValue(parameter) {
        logger.debug(`getSearchParameterValue: trying to get search parameter's: ${parameter} value.`);
        let value = await element(by.xpath(selectors.searchParameter(parameter))).getText();
        logger.debug(`getSearchParameterValue: search parameter's value: ${value}.`);
        return value;
    }

    async sort(sortingType) {
        logger.debug(`sort: trying to sort products by type: ${sortingType}.`);
        await super.clickOnElement(sortingType);
    }

    async getProductPrices() {
        logger.debug(`getProductPrices: trying to get all products prices.`);
        let allPrices = await super.getTextOfElements(selectors.productsPrices, this.convertPrice);
        logger.debug(`getProductPrices: all prices: ${allPrices}.`);
        return allPrices;
    }
    async getComparePrices() {
        logger.debug(`getComparePrices: trying to get prices of comparable products.`);
        let comparePrices = await super.getTextOfElements(selectors.comparePrices, this.convertComparePrices);
        logger.debug(`getComparePrices: prices: ${comparePrices}.`);
        return comparePrices;
    }

    async setProductToCompare(index) {
        logger.debug(`setProductToCompare: trying to set product with index: ${index} to compare.`);
        await super.clickOnElementByIndex(selectors.compareCheckBox, index);
    }

    async getCompareProductsAmount() {
        logger.debug(`getCompareProductsAmount: trying to amount of comparable products.`);
        let compareAmount = (await super.getTextOfElements(selectors.compareButton, this.convertProductsCompareText))[0];
        logger.debug(`getCompareProductsAmount: comparable products amount: ${compareAmount}.`);
    }

    async goToComparePage() {
        logger.debug(`goToComparePage: going to compare page.`);
        await super.clickOnElement(selectors.compareButton);
    }

    convertPrice(price) {
        logger.debug(`convertPrice: converting price from ${price}.`);
        let output = parseFloat(price
            .replace(/\s/g, '')
            .replace(',', '.')
            .split('–')[0]);

        logger.debug(`to ${output}.`);
        return output;

    }
    convertProductsCompareText(text) {
        return parseInt(text[0]);
    }
    convertComparePrices(price) {
        logger.debug(`convertPrice: converting compare price from ${price}.`);
        let output = parseFloat(price
            .replace(/\s/g, '')
            .replace(/[А-я.]/g, '')
            .replace(',', '.'));

        logger.debug(`to ${output}.`);
        return output; 
    }
};


module.exports = {
    productsPage: new ProductsPage()
};