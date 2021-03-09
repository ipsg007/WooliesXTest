import { priceInDigits } from '../helpers/testhelpers';
import AddressPage from './AddressPage';

export default class SummaryPage {
    _totalProductsPrice = () => cy.get('#total_product');
    _shippingPrice = () => cy.get('#total_shipping');
    _totalWithoutTax = () => cy.get('#total_price_without_tax');
    _taxAmount = () => cy.get('#total_tax');
    _totalAllInclusive = () => cy.get('#total_price');
    _proceedCta = () => cy.get('#center_column > p > a > span');

    getDisplayedProductsTotal() {
        return this._totalProductsPrice().should('be.visible').invoke('text').then((price) => {
            const total = priceInDigits(price);
            return { total, summaryPage: this };
        })
    }

    getShippingPrice() {
        return this._shippingPrice().invoke('text').then(price => {
            const total = priceInDigits(price);
            return { total, summaryPage: this };
        })
    }

    getTotalWithoutTax() {
        return this._totalWithoutTax().invoke('text').then(price => {
            const total = priceInDigits(price);
            return { total, summaryPage: this };
        })
    }

    getTaxDisplayed() {
        return this._taxAmount().invoke('text').then(price => {
            const tax = priceInDigits(price);
            return { tax, summaryPage: this };
        })
    }

    getTotalPriceAllInclusive() {
        return this._totalAllInclusive().invoke('text').then(price => {
            const total = priceInDigits(price);
            return { total, summaryPage: this };
        })
    }

    goToAddressVerification(){
        this._proceedCta().click();
        return new AddressPage();
    }
 
}
