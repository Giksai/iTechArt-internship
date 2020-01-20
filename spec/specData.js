const data = {
    catalog_householdEquipment: 'Бытовая техника',
    catalog_sportAndTourism: 'Спорт и туризм',

    productType_Microwaves: 'Микроволновые печи',
    productType_Bicycle: 'Велосипеды',

    vendor_Samsung: 'Samsung',

    sortType_Price_Descending: 'цене начать с дорогих',

    compareAmount: 2,
    authFormInputText: '1',
    auth_correctEmail: 'email@email.email',
    searchText: 'Беларусь',
    regionSelectionTitle: 'Первый Каталог :: Выбор региона и вида доставки - Покупателям',
    footerLinkText: 'О нас',
    aboutLinksAmount: 10,
    compareSearchAmount: 5,
    articleWordsAmount: 50,
    additionalArticlesAmount: 6,
    uriREGEX: /^([a-z][a-z0-9\*\-\.]*):\/\/(?:(?:(?:[\w\.\-\+!$&'\(\)*\+,;=]|%[0-9a-f]{2})+:)*(?:[\w\.\-\+%!$&'\(\)*\+,;=]|%[0-9a-f]{2})+@)?(?:(?:[a-z0-9\-\.]|%[0-9a-f]{2})+|(?:\[(?:[0-9a-f]{0,4}:)*(?:[0-9a-f]{0,4})\]))(?::[0-9]+)?(?:[\/|\?](?:[\w#!:\.\?\+=&@!$'~*,;\/\(\)\[\]\-]|%[0-9a-f]{2})*)?$/
  }

const errors = {
    wrongDellivery: 'Укажите вид доставки',

    wrongEmail: 'Введите корректный электронный адрес',
    wrongPassword: 'Требуется указать правильный пароль',
    wrongCaptcha: 'Значение указано неверно',

}

module.exports = {
    data: data,
    errors: errors
}