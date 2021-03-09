import SignUpPage from "./SignUpPage";

export default class HomePage {
  _signInLink = () => cy.get('div.header_user_info > a');
 
  goToSignUpPage() {
    this._signInLink().should('be.visible').click();
    return new SignUpPage();
  }
 
}
