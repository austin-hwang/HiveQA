// @flow
const baseUrl = 'https://staging.hive.com/'

export default {
  async goToHome (driver: WebDriverClass): Promise<void> {
    return driver.get(baseUrl)
  }
}
