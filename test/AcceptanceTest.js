// @flow
import { assert } from 'chai'

import RegistrationPage from './../src/pageobjects/RegistrationPage'
import BasePage from './../src/pageobjects/BasePage'

import DriverBuilder from './../src/lib/DriverBuilder'
import driverutils from './../src/lib/driver-utils'

describe('Acceptance Tests', function () {
  let driverBuilder
  let driver

  beforeEach(async function () {
    driverBuilder = new DriverBuilder()
    driver = driverBuilder.driver
    await driverutils.goToHome(driver)
  })

  it('Loads the registration page', async function () {
    const registrationPage = new RegistrationPage(driver)
    await registrationPage.isLoaded()
    // const title = await homePage.getTitle()
    // assert.strictEqual(title, 'Great companies work in Hive', 'Title should match expected tagline')
  })

  it('Registers new user using only required information', async function () {
    const registrationPage = new RegistrationPage(driver)
    const basePage = new BasePage(driver)
    let email = basePage.randomString() + "@domain.com" ;
    let password = basePage.randomString();

    await registrationPage.isLoaded()
    await registrationPage.join()
    await registrationPage.fillOutAccount(email, password)
    await driver.sleep(2000)
    await registrationPage.fillOutOrganization()
    await driver.sleep(2000)
    await registrationPage.fillOutList()
    await driver.sleep(2000)
    await registrationPage.fillOutInvite()
    await driver.sleep(2000)
    await registrationPage.fillOutStorage()
    await registrationPage.nextSteps()
    await registrationPage.logOut()
    await registrationPage.isLoaded()
    await registrationPage.logIn(email, password)
  })

  it('Forgot password works', async function () {
    const registrationPage = new RegistrationPage(driver)
    const basePage = new BasePage(driver)
    let email = basePage.randomString() + "@domain.com" ;
    await registrationPage.isLoaded()
    await registrationPage.forgotPass(email)
  })

  afterEach(async function () {
    await driverBuilder.quit()
  })
})
