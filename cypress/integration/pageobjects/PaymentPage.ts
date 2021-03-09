export default class PaymentPage {
  _payByBankWireLink = () => cy.get('#HOOK_PAYMENT > div:nth-child(1) > div > p > a');
  _confirmationCta = () => cy.get('#cart_navigation > button > span');
  _confirmationText = () => cy.get('#center_column > div > p > strong');
 
  selectPaymentMethod() {
    this._payByBankWireLink().should('be.visible').click();
    return this;
  }

  confirmOrder() {
    this._confirmationCta().should('be.visible').click();
    return this;
  }

  verifyOrderConfirmationMessage(orderConfirmationText) {
    this._confirmationText().should('be.visible').contains(orderConfirmationText);
    return this;
  }
 
}
