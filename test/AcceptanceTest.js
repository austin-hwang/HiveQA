// @flow
import { assert } from 'chai'

import RegistrationPage from './../src/pageobjects/RegistrationPage'
import BasePage from './../src/pageobjects/BasePage'

import DriverBuilder from './../src/lib/DriverBuilder'
import driverutils from './../src/lib/driver-utils'
import ResetPasswordPage from '../src/pageobjects/ResetPasswordPage';

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
  })

  it('Registers new user using only minimum, required information', async function () {
    const registrationPage = new RegistrationPage(driver)
    let email = registrationPage.randomString() + "@domain.com" ;
    let password = registrationPage.randomString();

    //First run
    await registrationPage.isLoaded()
    await registrationPage.join()
    await registrationPage.fillOutAccount(email, password, false)
    await driver.sleep(2000)
    await registrationPage.fillOutOrganization(false)
    await driver.sleep(2000)
    await registrationPage.fillOutList("")
    await driver.sleep(2000)
    await registrationPage.fillOutInvite("")
    await driver.sleep(2000)
    await registrationPage.fillOutStorage(false)
    await registrationPage.nextSteps()
    await registrationPage.logOut()
    await registrationPage.isLoaded()
    await registrationPage.logIn(email, password)
    await driver.sleep(2000)
    await registrationPage.logOut()

    //Second run
    let email2 = registrationPage.randomString() + "@domain.com" ;
    await registrationPage.isLoaded()
    await registrationPage.join()
    await registrationPage.fillOutAccount("", password, true)
    await registrationPage.fillOutAccount(email, password, true)
    await registrationPage.accountOptions()
    await registrationPage.fillOutAccount(email2, password, true)
    await driver.sleep(2000)
    await registrationPage.fillOutOrganization(true)
    await driver.sleep(2000)
    await registrationPage.fillOutList("Test")
    await driver.sleep(2000)
    await registrationPage.fillOutInvite("Test@domain.com")
    await driver.sleep(2000)
    await registrationPage.storageOptions()
    await registrationPage.fillOutStorage()
    await registrationPage.nextSteps()
    await registrationPage.logOut()
    await registrationPage.isLoaded()
    await registrationPage.logInOptions()
    await registrationPage.logIn(email, password)
    await driver.sleep(2000)
    await registrationPage.logOut()
  })

  it('Goes back home at each step', async function () {
    const registrationPage = new RegistrationPage(driver)
    await registrationPage.isLoaded()
    await registrationPage.join()
    await registrationPage.goBack()
    assert.isDefined(await registrationPage.getLogo(), "Expected main page logo")
  })

  it('Forgot password works', async function () {
    const registrationPage = new RegistrationPage(driver)
    const resetPasswordPage = new ResetPasswordPage(driver)

    let email = registrationPage.randomString() + "@domain.com" ;
    await registrationPage.isLoaded()
    await resetPasswordPage.forgotPass()
    await resetPasswordPage.fillOut("")
    const warning = await resetPasswordPage.getWarning()
    assert.strictEqual(warning, 'Email required', 'Warning should match expected message')
    await resetPasswordPage.fillOut(email)
    const message = await resetPasswordPage.getSuccessMessage()
    assert.strictEqual(message, 'Thanks, check your email and you should have a password reset link if an account with the associated email address exists.', 'Message should match expected message')
  })

  afterEach(async function () {
    await driverBuilder.quit()
  })
})
