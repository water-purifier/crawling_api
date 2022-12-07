const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const {
    get_element_text,
    get_elements_text,
    get_element_attribute,
    get_elements_attribute
} = require('./_func.js');

const screen = {
    width: 640,
    height: 480,
};


async function go() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(
            new chrome.Options()
                // .headless()
                .windowSize(screen)
        )
        .build();
    await driver.get('https://ign.com/news');
    ////*[@id="main-content"]/section/div/section/section[1]/div[*]
    // const page_source = await driver.getPageSource();
    const _items = await driver.findElements(By.css('section.main-content > div.content-item'));
    let _datas = [];
    for (let item of _items) {
        _datas.push({
            data_id: await item.getAttribute('data-id'),
            a_href: await get_element_attribute(item, 'a.item-body', 'href'),
            img_href: await get_element_attribute(item, 'img.item-image', 'src'),
        });
    }
    for (let data of _datas) {
        await driver.get(data.a_href);
        const data_json = {
            data_id: data.data_id,
            a_href: data.a_href,
            img_href: data.img_href,
            article_primary: await get_element_text(driver, 'div.article-object-link > a'),
            article_primary_href: await get_element_attribute(driver, 'div.article-object-link > a', 'href'),
            title: await get_element_text(driver, 'h1'),
            description: await get_element_text(driver, 'h2'),
            author: await get_element_text(driver, 'a.article-author'),
            createdAt: await get_element_text(driver, 'div.article-publish-date'),
            content: await get_element_text(driver, 'section.article-page'),
            comment_count: await get_element_text(driver, 'span[data-spot-im-class="comments-count"]'),
            topics: await get_elements_text(driver, 'span.index__tagName--Nj3_l'),
        };
        const _file = './datas/' + data.data_id.toString() + '.json';
        fs.writeFile(_file, JSON.stringify(data_json), function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
}

go();
