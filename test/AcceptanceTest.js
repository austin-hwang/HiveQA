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
  let sameEmail

  beforeEach(async function () {
    driverBuilder = new DriverBuilder()
    driver = driverBuilder.driver
    await driverutils.goToHome(driver)
  })

  // Tests that registration page can load up

  it('Loads the registration page', async function () {
    const registrationPage = new RegistrationPage(driver)
    await registrationPage.isLoaded() 
  })

  // Tests that users can register by filling out as little of the form as possible, only using required fields

  it('Registers new user using only minimum, required information', async function () {
    const registrationPage = new RegistrationPage(driver)
    sameEmail = registrationPage.randomString() + "@domain.com" ;
    let password = registrationPage.randomString();

    await registrationPage.isLoaded()
    await registrationPage.join()
    await registrationPage.fillOutAccount(sameEmail, password, false)
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
    await registrationPage.logIn(sameEmail, password)
    await driver.sleep(2000)
    await registrationPage.logOut()

  })

  /* Tests that users can register by filling out all optional fields. Note: I realized that you can put anything in 
  phone number field (e.g numbers, letters, improper phone number format) and it still works */

  it('Registers new user, using all account options and filling out all available fields', async function () {
     const registrationPage = new RegistrationPage(driver)
     let email2 = registrationPage.randomString() + "@domain.com" ;
     let password = registrationPage.randomString();

     await registrationPage.isLoaded()
     await registrationPage.join()
     await registrationPage.fillOutAccount("", password, true) // Tries empty email
     await registrationPage.fillOutAccount(sameEmail, "123", true) // Tries invalid email and password
     await registrationPage.accountOptions() // Tests pop-ups for google and slack options
     await registrationPage.fillOutAccount(email2, password, true) // Tries valid email
     await driver.sleep(2000)
     await registrationPage.fillOutOrganization(true)
     await driver.sleep(2000)
     await registrationPage.fillOutList("Test")
     await driver.sleep(2000)
     await registrationPage.fillOutInvite("Test@domain.com")
     await driver.sleep(2000)
     await registrationPage.storageOptions() // Tests pop-ups for google drive, box, and dropbox options
     await registrationPage.fillOutStorage()
     await registrationPage.nextSteps()
     await registrationPage.logOut()
     await registrationPage.isLoaded()
     await registrationPage.logInOptions() // Tests login pop-ups for google and slack options
     await registrationPage.logIn(sameEmail, password) // Tests incorrect log-in
     await registrationPage.logIn(email2, password) // Correct log-in
     await driver.sleep(2000)
     await registrationPage.logOut()
  })

  // Tests that users can return to sign in page in case they accidentally clicked on join 

  it('Goes back home after a step', async function () {
    const registrationPage = new RegistrationPage(driver)
    await registrationPage.isLoaded()
    await registrationPage.join()
    await registrationPage.goBack() // Tests returning to log-in page after moving forward a step, assumes same for all steps after
    assert.isDefined(await registrationPage.getLogo(), "Expected main page logo")
  })

  // Tests that users can go through with password reset if they forgot log-in information
  
  it('Forgot password functionality', async function () {
    const registrationPage = new RegistrationPage(driver)
    const resetPasswordPage = new ResetPasswordPage(driver)

    let email = registrationPage.randomString() + "@domain.com" ;
    await registrationPage.isLoaded()
    await resetPasswordPage.forgotPass()
    await resetPasswordPage.fillOut("") // First tries empty email
    const warning = await resetPasswordPage.getWarning()
    assert.strictEqual(warning, 'Email required', 'Warning should match expected message')
    await resetPasswordPage.fillOut(email) // Then tries correct email
    const message = await resetPasswordPage.getSuccessMessage()
    assert.strictEqual(message, 'Thanks, check your email and you should have a password reset link if an account with the associated email address exists.', 'Message should match expected message')
  })

  afterEach(async function () {
    await driverBuilder.quit()
  })
})
