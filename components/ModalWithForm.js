import Modal from "./Modal.js";
export default class ModalWithForm extends Modal {
  constructor(selector, handleSubmit){
    super(selector);
    this._handleSubmit = handleSubmit
    this._form = this._modal.querySelector('form')
  }

  setEventListeners(){
    this._form.addEventListener('submit', (e)=>{
      e.preventDefault()
      this._handleSubmit()
    })
    super.setEventListeners()
  }
}