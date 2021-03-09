import ShippingPage from "./ShippingPage";

export default class AddressPage {
  _proceedCta = () => cy.get('#center_column > form > p > button > span');
 
  goToShippingPage() {
    this._proceedCta().click();
    return new ShippingPage();
  }
 
}
