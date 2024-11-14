const puppeteer = require('puppeteer');

(async () => {
  // Запуск браузера
  const browser = await puppeteer.launch({ headless: false }); // headless: true - режим без интерфейса браузера
  const page = await browser.newPage(); // Создание новой вкладки

  // Переход на нужную страницу
  await page.goto('https://online.globus.ru/products/yabloki-golden-delishes-1-kg-78_KG', { waitUntil: 'load', timeout: 0 });

/*   // Ожидание загрузки нужного элемента на странице (например, заголовок h1)
  await page.waitForSelector('.prices__cur.js-item-price'); */

  // Извлечение текста из выбранного элемента
  const elementText = await page.$eval('div[itemtype="http://schema.org/Product"] .css-1t0dwxn', el => el.textContent);
  console.log('Извлечённый текст:', elementText);

  // Закрытие браузера
 await browser.close();
})();

/* const price = await page.evaluate(() => {
  // Находим элемент с классом product1 и внутри него ищем элемент с классом price
  const product1 = document.querySelector('#price-card');
  const priceElement = product1 ? product1.querySelector('.price-new') : null;
  return priceElement ? priceElement.textContent : null;
}); */
