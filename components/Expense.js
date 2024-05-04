export default class Expense {
  constructor(data){
    this._category = data.category;
    this._merchant = data.merchant;
    this._price = data.price;
    
  }
  
  generateExpenseRow(){
    this._element = document.querySelector('.expense__template').content.querySelector('.purchases-modal__list-item').cloneNode(true);
    this._purchaseItem = this._element.querySelector('.purchases-modal__list-item-text_category')
    this._merchantText = this._element.querySelector('.purchases-modal__list-item-text_merchant')
    this._amount = this._element.querySelector('.purchases-modal__list-item-text_amount')
    this._purchaseItem.textContent = this._category;
    this._merchantText.textContent = this._merchant;
    this._amount.textContent = '$' + this._price

    return this._element
  }
}