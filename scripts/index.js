/* ------------------------------------------------------------------------------------ */
/*                                        imports                                       */
/* ------------------------------------------------------------------------------------ */

import Expense from "../components/Expense.js";
import RecentExpense from "../components/RecentExpense.js";
import Modal from "../components/Modal.js";
import Section from "../components/Section.js";
import { maxRecentPurchases } from "../components/constants.js";
import ModalWithForm from "../components/ModalWithForm.js";

/* ------------------------------------------------------------------------------------ */
/*                                       tasklist                                       */
/* ------------------------------------------------------------------------------------ */

// implement functionality for updating the recent expenses with last 5 expenses
// implement functionality for updating username and profile picture
// make the data persist by creating api
// separate all code as per OOP principles
// implement form validation for empty entries


/* ------------------------------------------------------------------------------------ */
/*                                   define variables                                   */
/* ------------------------------------------------------------------------------------ */

let initialMoney = []
const payPeriodModal = document.querySelector('.pay-period-modal')
const purchasesNavBtn = document.querySelector('.sidebar__navigation-link_purchases')
const payPeriodNavBtn = document.querySelector('.sidebar__navigation-link_pay')
const mobilePayPeriodNavBtn = document.querySelector('.page__mobile-navigation-icon_pay')
const mobilePurchasesNavBtn = document.querySelector('.page__mobile-navigation-icon_purchases')
const body = document.querySelector('body')
const paycheckAmount = document.querySelector('.paycheck__amount')
const payPeriodForm = document.forms['payPeriodForm'];
const payPeriodCancelButton = document.querySelector('.pay-period-modal__cancel-button')
const newExpenseModal = document.querySelector('.add-expense-modal')
const addExpenseQuickAccessButton = document.querySelector('.quick-access__button_new-expense')
const addExpenseButton = document.querySelector('.purchases-modal__button')
const addExpenceCancelButton = document.querySelector('.add-expense-modal__button_cancel')
const newExpenseForm = document.forms["addExpenseForm"]
let currentRecentPurchases = 0;

/* ------------------------------------------------------------------------------------ */
/*                                  instantiate classes                                 */
/* ------------------------------------------------------------------------------------ */
const payPeriodModalClass = new ModalWithForm('pay-period-modal', handlePayPeriodSubmit)
const purchaseList = new Section('.purchases-modal__list');
const recentPurchaseList = new Section('.recent-purchases__container')
const addExpenseModal = new ModalWithForm('add-expense-modal', handleAddExpenseSubmit)
const purchaseListModal = new Modal('purchases-modal')


/* ------------------------------------------------------------------------------------ */
/*                                  set event listeners                                 */
/* ------------------------------------------------------------------------------------ */

payPeriodModalClass.setEventListeners();
addExpenseModal.setEventListeners()
purchaseListModal.setEventListeners()

purchasesNavBtn.addEventListener('click', ()=>{
  purchaseListModal.open()
})

mobilePurchasesNavBtn.addEventListener('click', ()=>{
  purchaseListModal.open()
  body.style.position = 'fixed'
})

payPeriodNavBtn.addEventListener('click', ()=>{
  payPeriodModalClass.open()
})

mobilePayPeriodNavBtn.addEventListener('click', ()=>{
  payPeriodModalClass.open()
})

payPeriodCancelButton.addEventListener('click', ()=>{
 payPeriodModalClass.close()
})

addExpenseButton.addEventListener('click', ()=>{
  purchaseListModal.close();
  body.style.position = 'relative'
  addExpenseModal.open();
})

addExpenseQuickAccessButton.addEventListener('click', ()=>{
  addExpenseModal.open()
})

addExpenceCancelButton.addEventListener('click', ()=>{
  addExpenseModal.close();
})


/* ------------------------------------------------------------------------------------ */
/*                                   define functions                                   */
/* ------------------------------------------------------------------------------------ */

function calculatePay(obj){
  
  return obj.reduce((a, b) => {
    return a += b
  }, 0)
}

function removeTaxes(number){
  let solution = (number - (number * .0765).toFixed(2)).toFixed(2)
  return solution
}

function generateExpense(classInstance, data){
  return new classInstance(data)
}

function setModalEventListeners(modals){
  modals.forEach(modal => {
    modal.setEventListeners()
  })
}

function handleAddExpenseSubmit(){
  // grab all inputs from the form that aren't buttons
  let inputs = Array.from(newExpenseForm.elements).filter(a => {
    return a.nodeName === "INPUT"
  })
  
  // format the inputs as an object 
  let inputObj = {}
  inputs.forEach(input => {
    if (input.id === 'price'){
      if(!input.value){
        input.value = 0;
      }
      inputObj[input.id] = parseInt(input.value)
    } else {
      inputObj[input.id] = input.value
    }
  })
  
  // format the expense data in a row suitable to be rendered in the DOM
  const expense = generateExpense(Expense, inputObj).generateExpenseRow()
  const recentExpense = generateExpense(RecentExpense, inputObj).generateExpenseRow()
  
  
  // determine the number of recent expenses, if more than maxRecentPurchases, don't render them, only in the recent expenses tab
  if (currentRecentPurchases < maxRecentPurchases){
    recentPurchaseList.renderItem(recentExpense)
    currentRecentPurchases ++;
  }
  purchaseList.renderItem(expense)
  
  
  inputs.forEach(input => {
    input.value = ''
  })
  
  newExpenseModal.classList.remove('add-expense-modal_visible')
}

function handlePayPeriodSubmit(){
  let sum = 0;
  initialMoney = []
  Array.from(payPeriodForm.elements).forEach(element => {
    if (element.type === 'text'){
      if (!element.value){
        element.value = 0
      }
      initialMoney.push(parseInt(element.value))
    }
  })
  sum = initialMoney.reduce((a, b) => {
    return a += b
  }, 0)
  paycheckAmount.textContent = `$${removeTaxes(calculatePay(initialMoney))}`

  payPeriodModal.classList.remove('pay-period-modal_visible')
  
  Array.from(payPeriodForm.elements).forEach(element => {
    if (element.nodeName === 'INPUT'){
      element.value = 0
    }
  })
}

/* ------------------------------------------------------------------------------------ */
/*                                        on load                                       */
/* ------------------------------------------------------------------------------------ */
body.style.position = 'relative';

/* ------------------------------------------------------------------------------------ */
/*                                       test area                                      */
/* ------------------------------------------------------------------------------------ */


