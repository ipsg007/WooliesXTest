import PaymentPage from "./PaymentPage";
import SignUpPage from "./SignUpPage";

export default class ShippingPage {
  _proceedCta = () => cy.get('#form > p > button > span');
  _conditionsCheckbox = () => cy.get('#cgv');
 
  acceptTermsAndConditions() {
    this._conditionsCheckbox().trigger('mouseover').click();
    return this;
  }

  goToPaymentPage() {
      this._proceedCta().click();
      return new PaymentPage();
  }
 
}
