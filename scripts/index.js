/* ------------------------------------------------------ */
/*                   set initial monies                   */
/* ------------------------------------------------------ */


const initialMoney = {
  'thursday': 100,
  'friday': 200,
  'monday': 300,
  'tuesday': 400,
  'wednesday': 500,
  'thursday2': 600,
  'friday2': 700,
  'monday2': 800,
  'tuesday2': 900,
  'wednesday2': 1000,
}


/* ------------------------------------------------------ */
/*                    define varialbes                    */
/* ------------------------------------------------------ */

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
const modals = document.querySelectorAll('.modal')


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

/* ------------------------------------------------------ */
/*                    define functions                    */
/* ------------------------------------------------------ */

function calculatePay(obj){
  let sum = 0
  Object.keys(obj).forEach(key => {
    sum += obj[key]
  })
  console.log(sum)
  return sum
}

function removeTaxes(number){
  let solution = (number - (number * .0765).toFixed(2)).toFixed(2)
  return solution
}

/* ------------------------------------------------------ */
/*                         on load                        */
/* ------------------------------------------------------ */
body.style.position = 'relative';


/* ------------------------------------------------------ */
/*                        test area                       */
/* ------------------------------------------------------ */
console.log(paycheckAmount.textContent)
paycheckAmount.textContent = `$1235.21`
