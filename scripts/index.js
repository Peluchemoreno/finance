import Expense from "../components/Expense.js";
import RecentExpense from "../components/RecentExpense.js";
import { purchases } from '../components/constants.js';
/* ------------------------------------------------------ */
/*                          tasks                         */
/* ------------------------------------------------------ */
// add buttons for done, and cancel in the pay form
// orgainze file structure for flat BEM
// create modal for new expense form
// implement functionality for adding items to the expenses page
// implement functionality for updating the recent expenses with last 5 expenses

/* ------------------------------------------------------ */
/*                   set initial monies                   */
/* ------------------------------------------------------ */


let initialMoney = []


/* ------------------------------------------------------ */
/*                    define varialbes                    */
/* ------------------------------------------------------ */

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



/* ------------------------------------------------------ */
/*                   set event listeners                  */
/* ------------------------------------------------------ */

purchasesModalCloseBtn.addEventListener('click', ()=>{
  purchasesModal.classList.remove('purchases-modal_visible')
  body.style.position = 'relative'
})

payPeriodModalCloseBtn.addEventListener('click', ()=>{
  payPeriodModal.classList.remove('pay-period-modal_visible')
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
  payPeriodModal.classList.add('pay-period-modal_visible')
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
    if (element.type === 'text'){
      element.value = 0
    }
  })
})

payPeriodCancelButton.addEventListener('click', ()=>{
  payPeriodModal.classList.remove('pay-period-modal_visible')
})
/* ------------------------------------------------------ */
/*                    define functions                    */
/* ------------------------------------------------------ */

function calculatePay(obj){
  
  return obj.reduce((a, b) => {
    return a += b
  }, 0)
}

function removeTaxes(number){
  let solution = (number - (number * .0765).toFixed(2)).toFixed(2)
  return solution
}

/* ------------------------------------------------------ */
/*                         on load                        */
/* ------------------------------------------------------ */
body.style.position = 'relative';

function generateExpense(classInstance, data){
  return new classInstance(data)
}

purchases.forEach(purchase => {
  const newPurchase = generateExpense(Expense, purchase)
  expenseSection.prepend(newPurchase.generateExpenseRow())

  const recentPurchase = generateExpense(RecentExpense, purchase)
  recentPurchasesSection.prepend(recentPurchase.generateExpenseRow())
})


/* ------------------------------------------------------ */
/*                        test area                       */
/* ------------------------------------------------------ */

