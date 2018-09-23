let homeUrl = "http://localhost:3000/pups"


class Adapter{

  fetchDogs(){
    return fetch(homeUrl)
      .then(res => res.json())
  }

  fetchDogProfile(id){
    let dogUrl = `${homeUrl}/${id}`
    return fetch(dogUrl)
      .then(res => res.json())
  }

  updateStatus(id, status){
    // console.log(status);
    let data = {isGoodDog: status}
    let dogUrl = `${homeUrl}/${id}`
    return fetch(dogUrl, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
  }

}
