import { By } from 'selenium-webdriver'
import BasePage from './BasePage'

const USERNAME = By.css('#email-input')
const PASSWORD = By.css('#password-input')
const FORGOT = By.css('#forgot-password')
const WARNING = By.css('div.list-item')
const RESETSUCCESS = By.css('h4')
const RESET = By.css('button.btn-primary')


export default class ResetPasswordPage extends BasePage {

  async forgotPass () {
    await this.click(FORGOT)
  }

  async fillOut (email: string) {
    await this.sendKeys(USERNAME, email)
    await this.click(RESET)
  }

  async getWarning () {
    return this.getText(WARNING)
  }

  async getSuccessMessage () {
    return this.getText(RESETSUCCESS)
  }

}