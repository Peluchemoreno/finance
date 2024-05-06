import Expense from "../components/Expense.js";
import RecentExpense from "../components/RecentExpense.js";
import { purchases } from '../components/constants.js';
import Modal from "../components/Modal.js";

/* ------------------------------------------------------------------------------------ */
/*                                       tasklist                                       */
/* ------------------------------------------------------------------------------------ */

// implement functionality for updating the recent expenses with last 5 expenses
// implement functionality for updating username and profile picture
// make the data persist by creating api
// separate all code as per OOP principles

/* ------------------------------------------------------------------------------------ */
/*                                  set initial monies                                  */
/* ------------------------------------------------------------------------------------ */


let initialMoney = []


/* ------------------------------------------------------------------------------------ */
/*                                   define variables                                   */
/* ------------------------------------------------------------------------------------ */

const expenseSection = document.querySelector('.purchases-modal__list')
const purchasesModal = document.querySelector('.purchases-modal')
const payPeriodModal = document.querySelector('.pay-period-modal')
const purchasesModalCloseBtn = document.querySelector('.purchases-modal__close-button')
const payPeriodModalCloseBtn = document.querySelector('.pay-period-modal__close-button')
const purchasesNavBtn = document.querySelector('.sidebar__navigation-link_purchases')
const payPeriodNavBtn = document.querySelector('.sidebar__navigation-link_pay')
const mobilePayPeriodNavBtn = document.querySelector('.page__mobile-navigation-icon_pay')
const mobilePurchasesNavBtn = document.querySelector('.page__mobile-navigation-icon_purchases')
const body = document.querySelector('body')
const paycheckAmount = document.querySelector('.paycheck__amount')
const payPeriodForm = document.forms['payPeriodForm'];
const payPeriodCancelButton = document.querySelector('.pay-period-modal__cancel-button')
const recentPurchasesSection = document.querySelector('.recent-purchases__container')
const newExpenseModal = document.querySelector('.add-expense-modal')
const addExpenseQuickAccessButton = document.querySelector('.quick-access__button_new-expense')
const addExpenseButton = document.querySelector('.purchases-modal__button')
const addExpenseCloseButton = document.querySelector('.add-expense-modal__close-button')
const addExpenceCancelButton = document.querySelector('.add-expense-modal__button_cancel')
const newExpenseForm = document.forms["addExpenseForm"]


/* ------------------------------------------------------------------------------------ */
/*                                  instantiate classes                                 */
/* ------------------------------------------------------------------------------------ */
const payPeriodModalClass = new Modal('pay-period-modal')



/* ------------------------------------------------------------------------------------ */
/*                                  set event listeners                                 */
/* ------------------------------------------------------------------------------------ */

purchasesModalCloseBtn.addEventListener('click', ()=>{
  purchasesModal.classList.remove('purchases-modal_visible')
  body.style.position = 'relative'
})

payPeriodModalCloseBtn.addEventListener('click', ()=>{
  payPeriodModalClass.close()
})

purchasesNavBtn.addEventListener('click', ()=>{
  purchasesModal.classList.add('purchases-modal_visible')
  purchasesModal.classList.add('sidebar__navigation-link_active')
})

mobilePurchasesNavBtn.addEventListener('click', ()=>{
  purchasesModal.classList.add('purchases-modal_visible')
  body.style.position = 'fixed'
})

payPeriodNavBtn.addEventListener('click', ()=>{
  payPeriodModalClass.open()

})

mobilePayPeriodNavBtn.addEventListener('click', ()=>{
  payPeriodModal.classList.add('pay-period-modal_visible')
})


payPeriodForm.addEventListener('submit', (e)=>{
  e.preventDefault();
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
})

payPeriodCancelButton.addEventListener('click', ()=>{
 payPeriodModalClass.close()
})

addExpenseButton.addEventListener('click', ()=>{
  purchasesModal.classList.remove('purchases-modal_visible')
  body.style.position = 'relative'
  newExpenseModal.classList.add('add-expense-modal_visible')
})

addExpenseQuickAccessButton.addEventListener('click', ()=>{
  newExpenseModal.classList.add('add-expense-modal_visible')
})

addExpenceCancelButton.addEventListener('click', ()=>{
  body.style.position = 'relative'
  newExpenseModal.classList.remove('add-expense-modal_visible')
})

addExpenseCloseButton.addEventListener('click', ()=>{
  body.style.position = 'relative'
  newExpenseModal.classList.remove('add-expense-modal_visible')
})


addExpenseForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  let inputs = Array.from(newExpenseForm.elements).filter(a => {
    return a.nodeName === "INPUT"
  })
  let inputObj = {}
  inputs.forEach(input => {
    if (input.id === 'price'){
      inputObj[input.id] = parseInt(input.value)
    } else {
      inputObj[input.id] = input.value
    }
  })
  

  expenseSection.prepend(generateExpense(Expense, inputObj).generateExpenseRow())
  recentPurchasesSection.prepend(generateExpense(RecentExpense, inputObj).generateExpenseRow())
  inputs.forEach(input => {
    input.value = ''
  })

  newExpenseModal.classList.remove('add-expense-modal_visible')
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

/* ------------------------------------------------------------------------------------ */
/*                                        on load                                       */
/* ------------------------------------------------------------------------------------ */
body.style.position = 'relative';
// page.style.overflow = 'scroll';


purchases.forEach(purchase => {
  const newPurchase = generateExpense(Expense, purchase)
  expenseSection.prepend(newPurchase.generateExpenseRow())

  const recentPurchase = generateExpense(RecentExpense, purchase)
  recentPurchasesSection.prepend(recentPurchase.generateExpenseRow())
})

/* ------------------------------------------------------------------------------------ */
/*                                       test area                                      */
/* ------------------------------------------------------------------------------------ */

