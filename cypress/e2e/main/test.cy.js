describe('Test Automation', function() {
    it('Visits Swag Labs page', function() {
    
        cy.visit("https://www.saucedemo.com/");

        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("secret_sauce")

        cy.get('[data-test="login-button"]').click()

        cy.get("div.inventory_item")
        cy.get("#add-to-cart-sauce-labs-backpack").click()
        cy.wait(1000)
        cy.get("#add-to-cart-sauce-labs-bike-light").click()
        cy.wait(1000)

        cy.get('.shopping_cart_badge').click()
        cy.wait(1000)
        cy.get('#item_4_title_link > .inventory_item_name')
        cy.wait(1000)
        cy.get("div.page_wrapper div.cart_contents_container div.cart_list div.cart_item:nth-child(3) div.cart_item_label a:nth-child(1) > div.inventory_item_name")
            .should("have.text","Sauce Labs Backpack")
        cy.get("div.page_wrapper div.cart_contents_container div.cart_list div.cart_item:nth-child(4) div.cart_item_label a:nth-child(1) > div.inventory_item_name") 
           .should("have.text", "Sauce Labs Bike Light")
        cy.wait(1000)            
        cy.get("button#checkout").click()

        cy.get('[data-test="firstName"]').type("Juan")
        cy.get('[data-test="lastName"]').type("Alba")
        cy.get('[data-test="postalCode"]').type("0000000")
        cy.wait(1000)
        cy.get('[data-test="continue"]').click()

        const price = []
      
        let sum = 0

        cy.get("div.inventory_item_price").each(($el,index,$list)=>{
            price[index]=$el.text()
        }).then(()=>{
            for(let i=0; i<=price.length; i++){
                cy.log(price[i])
                
                if(price[i]){
                    sum += (parseFloat(price[i].substring(1)))
                }
            }
            cy.log("Suma " + sum)
        })
        
        cy.wait(1000)
        cy.get('[data-test="finish"]').click()
        
        cy.get('.complete-header').should("have.text","Thank you for your order!")
        

})
})