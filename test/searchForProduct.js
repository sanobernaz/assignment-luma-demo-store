// Includes
const {Builder, By ,Key, Until, until}= require('selenium-webdriver');
const should = require('chai').should();

/*
As a customer,
i want to be able to search for  a product, so that i can find the product
i want to buy

*/

// Test group

describe('Search for  product',()=>{
    // Test cases:
    context('I search for  a product',()=>{
        it ('I should see the product that I have searched for', async()=>{
            // Search web browser
            const driver = await new Builder().forBrowser('firefox').build();
            // Search for a product
            try{
                // Move to magento site
                await driver.get('http://magento.softwaretestingboard.com/');
                // Get the search input
                await driver.wait(until.elementLocated(By.css('#search')),10000);
                await driver.findElement(By.id('search')).sendKeys('shirt',Key.RETURN);

                // find the first product

                await driver.wait(until.elementLocated(By.css('.product-item:first-child')),10000);
                const product = await driver.findElement(By.css('.product-item:first-child'));

                // find information
                let productTitle = await product.findElement(By.css('.product-item-link'));

                let productPrice = await product.findElement(By.css('.price'));

                // Extra text
                let productTitleText = await productTitle.getText();
                let productPriceText = await productPrice.getText();
                productTitleText.should.equal('Radiant Tee');
                productPriceText.should.equal('$22.00');



    
          }catch(error){
              console.log(error);
          }

         finally{
            await driver.quit();
         }
                 
    });

    });
});