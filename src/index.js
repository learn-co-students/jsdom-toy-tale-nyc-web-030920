let addToy = false;
const toyUrl = "http://localhost:3000/toys"
const requestHeader = { "Content-Type": "application/json",
                            "Accept": "application/json" }

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.getElementById("toy-collection")
  fetch(toyUrl).then(resp => resp.json()).then(toys => {
    toys.forEach(function(toyObject){
      createToy(toyObject)
    })
  })
    
  function createToy(toyObject){
    let newDiv = document.createElement("div")
    newDiv.className = "card"
    newDiv.innerHTML = ` 
    <h2>${toyObject.name}</h2>
    <img src=${toyObject.image} class="toy-avatar" />
    <p> ${toyObject.likes}</p>
    <button class="like-btn">Like <3</button>`
    newDiv.id = `${toyObject.id}`
    toyCollection.append(newDiv)
    const likeBtn = newDiv.querySelector(".like-btn")
    const likeCount = newDiv.getElementsByTagName("p")
    likeBtn.addEventListener("click", function(event){      
      let newCount = parseInt(likeCount[0].innerHTML) + 1
      likeCount[0].innerHTML = newCount
      
    fetch(`http://localhost:3000/toys/${toyObject.id}`, {
        method: "PATCH", 
        headers: requestHeader,
        body: JSON.stringify({
          "likes": `${newCount}`
          })
        })
      })
    }
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
    toyForm.addEventListener("submit", function(event){
      event.preventDefault()
      console.log(event)
      const form = event.target 
      const name = form.name.value
      const image = form.image.value
      const likes = 0
      const newToy = {name, image, likes}

      toyCollection.append(createToy(newToy))

      fetch(toyUrl, {
       method: "POST", 
       headers: requestHeader,
       body: JSON.stringify(newToy)
     })
      .then (resp => resp.json())      
    })
  });
});