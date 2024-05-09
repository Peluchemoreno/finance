export default class Modal {
  constructor(selector){
    this._modal = document.querySelector('.' + selector);
    this._selectorVisible = selector + '_visible';
    this._modalCloseButton = document.querySelector(`.${selector}__close-button`);
    this._body = document.querySelector('body')
  }

  setEventListeners(){
    this._modalCloseButton.addEventListener('click', ()=>{
      this.close()
    })
  }
  
  open(){
    this._modal.classList.add(this._selectorVisible)
  }

  close(){
    this._body.style.position = 'relative'
    this._modal.classList.remove(this._selectorVisible)
  }

}