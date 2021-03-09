import MyAccountPage from "./MyAccountPage";

export default class SignUpPage {
    _emailTextBox = () => cy.get('#email');
    _passwordTextBox = () => cy.get('#passwd');
    _signInCta = () => cy.get('#SubmitLogin > span');
   
    signUpAsExistingUser(email: string, password: string) {
        this._emailTextBox().should('be.visible').type(email);        
        this._passwordTextBox().type(password);
        this._signInCta().click();
        return new MyAccountPage();
    }
   
  }
  