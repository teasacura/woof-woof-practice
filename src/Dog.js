class Dog{
  constructor({id, name, isGoodDog, image}){
    this.id = id
    this.name = name
    this.isGoodDog = isGoodDog
    this.image = image
  }

  dogProfileHTML(){
    return `<img src='${this.image}'>
 <h2>${this.name}</h2>
 <button data-id=${this.id}>${this.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>`
  }

  dogSpanHTML(){
    return `<span data-id='${this.id}'>${this.name}</span>`
  }
}
