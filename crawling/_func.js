const {By} = require("selenium-webdriver");

async function get_element_text(driver, css) {
    const _eles = await driver.findElements(By.css(css));
    if (_eles != null && _eles.length > 0) {
        return _eles[0].getText();
    }
    return null;
}
async function get_elements_text(driver, css) {
    const _eles = await driver.findElements(By.css(css));
    if (_eles != null && _eles.length > 0) {
        let arrs = [];
        for (const _ele of _eles) {
            arrs.push(_ele.getText());
        }
        return arrs;
    }
    return null;
}
async function get_element_attribute(driver, css, attribute_name) {
    const _eles = await driver.findElements(By.css(css));
    if (_eles != null && _eles.length > 0) {
        return _eles[0].getAttribute(attribute_name);
    }
    return null;
}
async function get_elements_attribute(driver, css, attribute_name) {
    const _eles = await driver.findElements(By.css(css));
    if (_eles != null && _eles.length > 0) {
        let arrs = [];
        for (const _ele of _eles) {
            arrs.push(_ele.getAttribute(attribute_name));
        }
        return arrs;
    }
    return null;
}

module.exports = {
    get_element_attribute,
    get_elements_attribute,
    get_element_text,
    get_elements_text,
}
