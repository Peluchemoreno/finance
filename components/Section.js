export default class Section {
  constructor(selector){
    this._selector = document.querySelector(selector)
  }

  renderItem(item){
    this._selector.append(item)
  }
}