let dogBar = document.querySelector("#dog-bar")
let dogDiv = document.querySelector("#dog-info")
let dogFilter = document.querySelector("#good-dog-filter")
let adapter = new Adapter;

let filterStatus = false;

document.addEventListener("DOMContentLoaded", init)
dogFilter.addEventListener('click', toggleDogFilter)
dogDiv.addEventListener('click', handleButtonClick)

  function init(){
    adapter.fetchDogs()
    .then(dogArray => dogArray.map(dog => createDog(dog)))
    .then(dogObjects => dogSpannify(dogObjects))
    .then(addDogNames)
  }

  function createDog(dog){
    let newDog = new Dog(dog)
    return newDog
  }

  function dogSpannify(dogObjects){
    let dogSpans = ""
    dogObjects.map((dog) => dogSpans += dog.dogSpanHTML())
    return dogSpans
  }

  function addDogNames(str){
    dogBar.innerHTML = str
    dogBar.addEventListener('click', handleSpanClick)
  }

  function handleSpanClick(e){
    if (e.target.nodeName === "SPAN"){
      adapter.fetchDogProfile(e.target.dataset.id)
      .then(createDog)
      .then(renderProfile)
    }
  }

  function renderProfile(dog){
    dogDiv.innerHTML = dog.dogProfileHTML()
  }

  function handleButtonClick(e){

    let newStatus = e.target.innerText === "Good Dog!" ? false : true
    adapter.updateStatus(e.target.dataset.id, newStatus)
    .then(createDog)
    .then(renderProfile)
    .then(updateDogBar)

  }

  function fetchGoodDogs(){
    adapter.fetchDogs()
    .then(dogArray => dogArray.map(dog => createDog(dog)))
    .then(dogObjects => goodDogsFilter(dogObjects))
    .then(dogObjects => dogSpannify(dogObjects))
    .then(addDogNames)
  }

  function goodDogsFilter(dogObjects){
    return dogObjects.filter(dog => dog.isGoodDog)
  }

  function toggleDogFilter(e){
    if (filterStatus){
      filterStatus = false
      e.target.innerText = "Filter good dogs: OFF"
      init()
    } else {
      filterStatus = true
      e.target.innerText = "Filter good dogs: ON"
      fetchGoodDogs()
    }
  }

  function updateDogBar(){
  if (filterStatus){
    fetchGoodDogs()
  } else {
    init()
  }
}
