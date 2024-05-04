export default class Expense {
  constructor(category, merchant, price){
    this._category = category;
    this._merchant = merchant;
    this._price = price;
    
  }
  
  generateExpenseRow(){
    this._element = document.querySelector('.expense__template').content.querySelector('.purchases-modal__list-item').cloneNode(true);
    this._purchaseItem = this._element.querySelector('.purchases-modal__list-item-text_category')
    this._merchantText = this._element.querySelector('.purchases-modal__list-item-text_merchant')
    this._amount = this._element.querySelector('.purchases-modal__list-item-text_amount')
    this._purchaseItem.textContent = this._category;
    this._merchantText = this._merchant;
    this._price = '$' + this._price

    return this._element
  }
}