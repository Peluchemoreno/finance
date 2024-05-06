export default class Modal {
  constructor(selector){
    this._modal = document.querySelector('.' + selector)
    this._selectorVisible = selector + '_visible'
  }

  open(){
    this._modal.classList.add(this._selectorVisible)
  }

  close(){
    this._modal.classList.remove(this._selectorVisible)
  }
}