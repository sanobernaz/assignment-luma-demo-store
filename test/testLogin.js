const{Builder, By, Until, until}= require('selenium-webdriver');
const should= require('chai').should();
require('dotenv').config();

// login data
let user= process.env.USER;
let pass= process.env.PASS;

/* As a user of luma webstore, 
I would like to be able to login,
so that  i can see my profile


*/
// .only() - run only this test block // .skip() - skip this specific test 
describe('login to Luma Demostore', ()=>{
    context('I click on login and enter my credentials',()=>{
        it('I should be logged in and see my profile', async()=>{
            const driver = await new Builder().forBrowser('firefox').build();
            try{
                //Go to magento store
                await driver.get('http://magento.softWaretestingboard.com');
                await driver.findElement(By.css('.authorization-link > a:nth-child(1)')).click();

                // Get the form 
                await driver.wait(until.elementLocated(By.id('email')),10000);

                // send keys
                await driver.findElement(By.id('email')).sendKeys(user);
                await driver.findElement(By.id('pass')).sendKeys(pass);

                // click login button
                await driver.findElement(By.css('#send2')).click();

                // Implicit wait to allow site to load
                await driver.sleep(1000);

                // Get to our profile
                await driver.wait(until.elementLocated(By.css('.action.switch')),200000);
                await driver.findElement(By.css('.action.switch')).click();
                await driver.wait(until.elementLocated(By.css('a[href="https://magento.softwaretestingboard.com/customer/account/"]')),10000)
                await driver.findElement(By.css('a[href$="/customer/account/"]')).click();

                // get and check information
                await driver.wait(until.elementLocated(By.css('.box-information .box-content p')), 10000);
                let information = await driver.findElement(By.css('.box-information .box-content p')).getText();
                

                // Assert

                information.should.contain('Test Testsson');


            }
            finally{
                await driver.quit();
            }
                

            });

        });
    });