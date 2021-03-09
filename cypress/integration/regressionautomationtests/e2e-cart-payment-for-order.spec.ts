import DressesProductPage from "../pageobjects/DressesProductpage";

describe('E2E for purchase: 2 items added', function () {
  beforeEach(function () {  
    cy.fixture('Testdata.json').as('data');
  });

  it('Adding 2 items to the cart and placing an order', function () {
    cy.gotoHomePage().then((homePage) => {
        homePage
        .goToSignUpPage()
        .signUpAsExistingUser(this.data.email, this.data.password)
        .goToDressesPage()
        .addDressesToCartAndVerifyPrice(this.data.total)        
        .getDisplayedProductsTotal().then(({ total: totalWithoutShipping, summaryPage}) => {
            expect(totalWithoutShipping).to.equal(this.data.totalWithoutShipping);
            return summaryPage;
        })
        .then((summaryPage) => {
            summaryPage
            .getShippingPrice().then(({ total: totalShipping, summaryPage}) => {
                expect(totalShipping).to.equal(this.data.shippingCharges);
                return summaryPage;
            })
        })
        .then((summaryPage) => {
            summaryPage
            .getTotalWithoutTax().then(({ total: totalWithoutTax, summaryPage}) => {
                expect(totalWithoutTax).to.equal(this.data.totalWithoutTax);
                return summaryPage;
            })
        })
        .then((summaryPage) => {
            summaryPage
            .getTaxDisplayed().then(({ tax: taxAmount, summaryPage}) => {
                expect(taxAmount).to.equal(this.data.tax);
                return summaryPage;
            })
        })
        .then((summaryPage) => {
            summaryPage
            .getTotalPriceAllInclusive().then(({ total: totalAllInclusive, summaryPage}) => {
                expect(totalAllInclusive).to.equal(this.data.total);
                return summaryPage;
            })
        })
        .then((summaryPage) =>{ 
            summaryPage
            .goToAddressVerification()
            .goToShippingPage()
            .acceptTermsAndConditions()
            .goToPaymentPage()
            .selectPaymentMethod()
            .confirmOrder()
            .verifyOrderConfirmationMessage(this.data.orderConfirmationText)   ;         
        })               
      })
    })
  });