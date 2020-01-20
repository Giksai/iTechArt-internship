const log4js = require('../loggerConfig/loggerConfigurator'),
    {BasePage} = require('./basePage');

const logger = log4js.getLogger('default');

const selectors = {
    deliveryTypeBox: (type) => {
        return `//tr/td/label[text()="${type}"]`;
    },
    deliveryTypeCheckBox: (type) => {
        return `//tr/td/label[text()="${type}"]/../../td/input`;
    },
    adressInfo: (type, value) => {
        return `//select[@id="${type}"]/option[text()="${value}"]`;
    },
};

const deliveryTypes = {
    courier: 'Курьером',
    mail: 'Почтой',
    pickup: 'Самовывоз',
};

const regions = {
    minsk: 'Минская обл.',
};

const cities = {
    logoisk: 'Логойск',
};

const adressType = {
    region: 'regionid',
    city: 'cityid',
};

class RegionSelectionPage extends BasePage {
    deliveryTypes = deliveryTypes
    regions = regions
    cities = cities

    async selectDeliveryType(type) {
        logger.debug(`selectDeliveryType: trying to set delivery type to: ${type}.`);
        await super.clickOnElement(selectors.deliveryTypeBox(type));
    }

    async selectAdressInfo(region, city) {
        logger.debug(`selectAdressInfo: setting address info to region: ${region}, city: ${city}.`);
        logger.debug(`selectAdressInfo: selecting region ${region}.`);
        await super.clickOnElement(selectors.adressInfo(adressType.region, region));
        logger.debug(`selectAdressInfo: waiting for city elements to render.`);
        await super.waitForElement(selectors.adressInfo(adressType.city, city));
        logger.debug(`selectAdressInfo: selecting city ${city}.`);
        await super.clickOnElement(selectors.adressInfo(adressType.city, city));
    }

    async isDeliveryTypeChecked(type) {
        let isChecked = (await element(by.xpath(
            selectors.deliveryTypeCheckBox(type)))
            .getAttribute('checked')) === 'true';
        logger.debug(`isDeliveryTypeChecked: is delivery type checked: ${isChecked}.`);
        return isChecked;
    }

};

module.exports = {
    regionSelectionPage: new RegionSelectionPage()
};