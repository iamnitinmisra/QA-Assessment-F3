import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://localhost:4000')
})

afterAll(async () => {
    await driver.quit()
})

test('I can start a game', async () => {

    let button = await (await driver).findElement(By.id('start-game'));
    await button.click();
    
});

test('clicking upper left corner adds an X to the box', async ()=>{
    const upperLeftBox = await driver.findElement(By.id('cell-0'))
    upperLeftBox.click()

    expect(await upperLeftBox.getText()).toEqual('X')

    await driver.sleep(2000)
})

test('clicking upper right corner adds an X to the box', async ()=>{
    const upperRightBox = await driver.findElement(By.id('cell-2'))
    upperRightBox.click()

    expect(await upperRightBox.getText()).toEqual('X')

    await driver.sleep(2000)
})

test('clicking lower right square adds an X to the box', async () => {
    driver.navigate().refresh()
    await driver.sleep(2000)

    // start the game
    let button = await (await driver).findElement(By.id('start-game'));
    await button.click();

    const lowerRightBox = await driver.findElement(By.id('cell-8'))
    lowerRightBox.click()

    expect(await lowerRightBox.getText()).toEqual('X')

    await driver.sleep(2000)
})

test('computer takes turn after my first turn', async () => {
    const computerTurn = await driver.findElements(By.xpath('//td[text()="O"]'))
    let computerMoved = false;
    console.log(computerTurn)

    if(computerTurn.length){
        computerMoved = true
    }

    expect(computerMoved).toBeTruthy()

    await driver.sleep(2000)
})