const expect = require('chai').expect;
const debug = require('debug')('sample-trial-app');

const {
    getDefaultDriver,
    waitUntilElement,
    waitUntilIframe,
    loginMVD,
    launchApp,
    locateApp,
} = require('./utils');

const APP_TO_TEST = 'Sample Trial App';
let driver;
let appLaunched = false;

describe('test sample app', function() {
    before('verify environment variable and load login page', async function() {
      expect(process.env.SSH_HOST, 'SSH_HOST is not defined').to.not.be.empty;
      expect(process.env.SSH_USER, 'SSH_USER is not defined').to.not.be.empty;
      expect(process.env.SSH_PASSWD, 'SSH_PASSWD is not defined').to.not.be.empty;
      expect(process.env.ZOWE_ZLUX_HTTPS_PORT, 'ZOWE_ZLUX_HTTPS_PORT is not defined').to.not.be.empty;
      expect(process.env.ZOWE_API_MEDIATION_GATEWAY_HTTP_PORT, 'ZOWE_API_MEDIATION_GATEWAY_HTTP_PORT is not defined').to.not.be.empty;

      driver = await getDefaultDriver();
      debug('webdriver initialized');

      await loginMVD(
        driver,
        `https://${process.env.SSH_HOST}:${process.env.ZOWE_API_MEDIATION_GATEWAY_HTTP_PORT}/ui/v1/zlux/ZLUX`,
        process.env.SSH_USER,
        process.env.SSH_PASSWD
      );
  });

  it('should launch app correctly', async function() {
    await launchApp(driver, APP_TO_TEST);
    const app = await locateApp(driver, APP_TO_TEST);
    expect(app).to.be.an('object');
    debug('app launched');

    const caption = await waitUntilElement(driver, 'rs-com-mvd-window .heading .caption');
    expect(caption).to.be.an('object');
    debug('caption is ready');

    const captionText = await caption.getText();
    expect(captionText).to.be.equal(APP_TO_TEST);
    debug('app caption checked ok');

    const viewport = await waitUntilElement(driver, 'rs-com-mvd-window .body com-rs-mvd-viewport');
    expect(viewport).to.be.an('object');
    debug('app viewport is ready');

    appLaunched = true;
  });
  
  it('Home page loaded correctly', async function() {
    if (!appLaunched) {
        this.skip();
    }

    //switch iframes
    const iframe = await waitUntilIframe(driver, "#mvd_iframe_0");
    expect(iframe).to.be.an('object');
    debug('switched iframes');

    //locate HomePage button and click
    const homeButton = await waitUntilElement(driver, '.mr-auto.navbar-nav .nav-item a[href=\'\/\']');
    expect(homeButton).to.be.an('object');
    await homeButton.click();
    debug('Navigated to home page');

    const homeContainer = await waitUntilElement(driver, '.jumbotron.jumbotron-fluid .container h1');
    expect(homeContainer).to.be.an('object');
    const homeContainerText = await homeContainer.getText();
    expect(homeContainerText).to.be.equal('Home Page Component');

    driver.switchTo().defaultContent();
  });

  it('Accounts page should load correctly', async function() {
    if (!appLaunched) {
        this.skip();
    }

    //switch iframes
    const iframe = await waitUntilIframe(driver, "#mvd_iframe_0");
    expect(iframe).to.be.an('object');
    debug('switched iframes');

    //locate HomePage button and click
    const accountsButton = await waitUntilElement(driver, '.mr-auto.navbar-nav .nav-item a[href=\'\/accounts\']');
    expect(accountsButton).to.be.an('object');
    await accountsButton.click();
    debug('Navigated to accounts page');

    //Checks to see the page loaded elements properly
    const accountTableHeader = await waitUntilElement(driver, '#root div h1');
    expect(accountTableHeader).to.be.an('object');
    const accountTableHeaderText = await accountTableHeader.getText();
    expect(accountTableHeaderText).to.be.equal('Account(s) List');
    debug('Header is loaded properly in accounts page');

    //Checks to see if table is loaded
    const accountsTable = await waitUntilElement(driver, '.table-responsive .table.table-striped')
    expect(accountsTable).to.be.an('object');
    debug('Table is loaded properly');

    driver.switchTo().defaultContent();
  });

  after('quit webdriver', async function() {
    // quit webdriver
    if (driver) {
      await driver.quit();
    }
  });
  
});