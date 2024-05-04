import Expense from './Expense.js'
export default class RecentExpense extends Expense {
  constructor(data){
    super(data)
  }

  generateExpenseRow(){
      this._element = document.querySelector('.recent-expense__template').content.querySelector('.recent-purchases__purchase').cloneNode(true);
      this._purchaseItem = this._element.querySelector('.recent-purchases__purchase_category')
      this._merchantText = this._element.querySelector('.recent-purchases__purchase_merchant')
      this._amount = this._element.querySelector('.recent-purchases__purchase_amount')
      this._purchaseItem.textContent = this._category;
      this._merchantText.textContent = this._merchant;
      this._amount.textContent = '$' + this._price

      return this._element
  }
}