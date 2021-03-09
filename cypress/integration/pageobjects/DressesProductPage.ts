import { priceInDigits } from '../helpers/testhelpers';
import SummaryPage from './SummaryPage';
import CheckoutPage from "./SummaryPage";

export default class DressesProductPage {  
  _addToCartCta = () => cy.get('a.button.ajax_add_to_cart_button.btn.btn-default > span');
  _continueShoppingCta = () => cy.get('div.button-container > span > span');
  _allDresses = () => cy.get('li.ajax_block_product > div');
  _cartBar = () => cy.get('div:nth-child(3) > div > a > b');
  _priceOfDresses = () => cy.get('.products> dt> div>span');
  _displayedTotal = () => cy.get('.price.cart_block_total.ajax_block_cart_total');
  _checkoutCta = () => cy.get('#button_order_cart > span');
  _shippingPrice = () => cy.get('div> span.price.cart_block_shipping_cost.ajax_cart_shipping_cost');


  addDressesToCartAndVerifyPrice(paramTotal) {
    this.addDressesTocart().then(() => {
      this.calculateTotalPrice().then((sum) => {
        this.displayedTotalAtProductPage()
                  .then((displayedTotalPriceAtProductPage) => {
                    expect(sum).to.equal(
                      displayedTotalPriceAtProductPage,
                    );
                    expect(displayedTotalPriceAtProductPage).to.equal(paramTotal);
                  })
                })
              }).then(() => {
                this.goToSummaryPage();
              })
              
              return new CheckoutPage();
            }

  addDressesTocart() {
    return this._allDresses().each(($el, index) => {
      if (index == 0) {
        cy.wrap($el)
          .find('img')          
          .then(cy.wrap)
          .trigger('mouseover').then(() => {
              this._addToCartCta().eq(index).should('be.visible').click();   
              this._continueShoppingCta().should('be.visible') .click();           
              })          
      } else if (index == 1) {
        cy.wrap($el)
          .find('img')          
          .then(cy.wrap)
          .trigger('mouseover').then(() => {
            this._addToCartCta().eq(index).should('be.visible').click();
            this._continueShoppingCta().should('be.visible') .click();
        })          
      }            
    }).then (() => {
      return this;

    })
   
    
  }

  calculateTotalPrice() {
    let sum = 0;    
    return this._cartBar().should('be.visible').trigger('mouseover').then(() => {
    return this._shippingPrice()
      .invoke('text')
      .then((price) => {
        sum += priceInDigits(price);
        return this._priceOfDresses()
          .each(($el) => {
            cy.wrap($el)
              .invoke('text')
              .then((dressPrice) => {
                sum += priceInDigits(dressPrice);
              });
          })
          .then(() => {            
              sum = parseFloat(sum.toFixed(2));
              return sum;                        
          });
      });
    });
  }

   displayedTotalAtProductPage() {
    let displayedTotalPriceAtProductPage: number;
    return this._cartBar().should('be.visible').trigger('mouseover').then(() => {
        this._displayedTotal()
        .invoke('text')
        .then((displayedTotal) => {
          displayedTotalPriceAtProductPage = priceInDigits(displayedTotal);
        })
        .then(() => {
          return displayedTotalPriceAtProductPage;
        });
    })
  }  

    goToSummaryPage() {
        this._cartBar().should('be.visible').trigger('mouseover').then(() => {
            this._checkoutCta().should('be.visible').click();            
        })
        
    }  
}