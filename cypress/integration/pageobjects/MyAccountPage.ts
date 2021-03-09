import DressesProductpage from "./DressesProductpage";

export default class MyAccountPage {
  _dressesLink = () => cy.get('#block_top_menu > ul > li:nth-child(2) > a');
 
  goToDressesPage() {
    this._dressesLink().should('be.visible').click();
    return new DressesProductpage();
  }
 
}
