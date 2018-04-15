// @flow
import { By } from 'selenium-webdriver'
import BasePage from './BasePage'

const TITLE = By.css('h1')
const USERNAME = By.css('#email-input')
const PASSWORD = By.css('#password-input')
const JOIN = By.css('#join-hive')
const CONTINUE = By.css('.js-ob-video-continue')
const FIRSTNAME = By.css('#firstName')
const LASTNAME = By.css('#lastName')
const PHONE = By.css('#phone')
const EMAIL = By.css('#email')
const PASS = By.css('#password')
const ORGANIZATION = By.css('.js-workspace-input')
const SIZE = By.xpath("//radio-button[contains(.,'1-10')]")
const COMPLETEORGANIZATION = By.xpath('(//button[@type="submit"])[3]')
const COMPLETELIST = By.xpath('(//button[@type="submit"])[4]')
const SKIPINVITE = By.xpath('//form[@id="onboardingCardTeammatesForm"]/div[4]/button[2]')
const SKIPSTORAGE = By.xpath('(//button[@type="button"])[2]')
const CONTINUING = By.css('button[type="submit"]')
const ITEM = By.css('input.js-action-input')
const INVITE = By.css('input.js-email-input')
const NEXTSTEP = By.css('div.js-next-step.next-step > span')
const PROFILE = By.xpath('//nav[@id="topNav"]/div/ul[2]/li[6]/a/div/span')
const LOGOUT = By.css('a.js-logout')
const WELCOME = By.css('span.title.centered')
const STORAGETITLE = By.css('#onboardingCardFiles > div.card-main > h1.card-title')
const SIGNIN = By.css('button.btn-primary')
const FORGOT = By.css('#forgot-password')
const WARNING = By.css('div.list-item')

export default class RegistrationPage extends BasePage {

  async isLoaded () {
    await this.waitForDisplayed(USERNAME)
    await this.waitForDisplayed(PASSWORD)
  }

  async join () {
    await this.click(JOIN) 
    await this.click(CONTINUE)
  }

  async fillOutAccount (email: string, password: string) {
    await this.waitForDisplayed(FIRSTNAME)
    await this.sendKeys(FIRSTNAME, "John")
    await this.sendKeys(LASTNAME, "Doe")
    await this.sendKeys(PHONE, "1234567890")
    await this.sendKeys(EMAIL, email)
    await this.sendKeys(PASS, password)
    await this.click(CONTINUING)
  }

  async fillOutOrganization () {
    await this.waitForDisplayed(ORGANIZATION)
    await this.sendKeys(ORGANIZATION, "Test")
    await this.click(COMPLETEORGANIZATION)
  }

  async fillOutList () {
    await this.waitForDisplayed(ITEM)
    await this.click(COMPLETELIST)
  }

  async fillOutInvite () {
    await this.waitForDisplayed(INVITE)
    await this.click(SKIPINVITE)
  }

  async fillOutStorage () {
    await this.waitForDisplayed(STORAGETITLE)
    await this.click(SKIPSTORAGE)
  }

  async nextSteps () {
    await this.waitForDisplayed(WELCOME)
    await this.click(NEXTSTEP)
    await this.click(NEXTSTEP)
  }

  async logOut () {
    await this.click(PROFILE)
    await this.click(LOGOUT)
  }

  async logIn (email: string, password: string) {
    await this.sendKeys(USERNAME, email)
    await this.sendKeys(PASSWORD, password)
    await this.click(SIGNIN)
  }

  async forgotPass (email: string) {
    await this.click(FORGOT)
    await this.sendKeys(USERNAME, email)
    await this.click(SIGNIN)
  }

  async getWarning () {
    return this.getText(WARNING)
  }

  async getTitle () {
    return this.getText(TITLE)
  }

}
