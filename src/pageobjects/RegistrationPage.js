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
const SIZE = By.css("span.radio-button")
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
const DRIVE = By.css('button.ob-file-store-btn.connect-google-drive')
const BOX = By.css('button.ob-file-store-btn.connect-box')
const DROPBOX = By.css('button.ob-file-store-btn.connect-dropbox')
const GOOGLE = By.css('span.button-text')
const SLACK = By.css('div.connect-slack > span.button-text')
const CONNECTGOOGLE = By.css('div.connect-google > span')
const CONNECTSLACK = By.css('div.connect-slack')
const BACK = By.css('button.sc-bdVaJa.jKQCOK')
const LOGO = By.css('img.logo')


export default class RegistrationPage extends BasePage {

  async isLoaded () {
    await this.waitForDisplayed(USERNAME)
    await this.waitForDisplayed(PASSWORD)
  }

  async join () {
    await this.click(JOIN) 
    await this.click(CONTINUE)
  }

  async fillOutAccount (email: string, password: string, phone: boolean) {
    await this.waitForDisplayed(FIRSTNAME)
    await this.sendKeys(FIRSTNAME, "John")
    await this.sendKeys(LASTNAME, "Doe")
    if (phone) await this.sendKeys(PHONE, "1234567890")
    await this.sendKeys(EMAIL, email)
    await this.sendKeys(PASS, password)
    await this.click(CONTINUING)
  }

  async accountOptions () {
    await this.click(CONNECTGOOGLE)
    await this.closePopUp()
    await this.click(CONNECTSLACK)
    await this.closePopUp()
  }

  async fillOutOrganization (test: boolean) {
    await this.waitForDisplayed(ORGANIZATION)
    await this.sendKeys(ORGANIZATION, "Test")
    if (test) await this.click(SIZE)
    await this.click(COMPLETEORGANIZATION)
  }

  async fillOutList (item: string) {
    await this.waitForDisplayed(ITEM)
    await this.sendKeys(ITEM, item)
    await this.click(COMPLETELIST)
  }

  async fillOutInvite (email: string) {
    await this.waitForDisplayed(INVITE)
    await this.sendKeys(INVITE, email)
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

  async logInOptions () {
    await this.click(GOOGLE)
    await this.closePopUp()
    await this.click(SLACK)
    await this.closePopUp()
  }

  async storageOptions () {
    await this.click(DRIVE)
    await this.closePopUp()
    await this.click(BOX)
    await this.closePopUp()
    await this.click(DROPBOX)
    await this.closePopUp()
  }

  async getLogo () {
    return LOGO
  }

  async goBack () {
    await this.click(BACK)
  }
}
