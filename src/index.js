let addToy = false;
const baseUrl = "http://localhost:3000/toys"
const requestHeaders = {
  "accept": "application/json",
  "content-type": "application/json"
}

document.addEventListener("DOMContentLoaded", () => {

  const toyContainer = document.querySelector("#toy-collection")

  fetch(baseUrl)
  .then(response => response.json())
  .then(function(toys) {
    toys.forEach(function(toy){
      return makeToy(toy)
    })
  })


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

  
  });

  const tForm = document.querySelector(".add-toy-form")

  tForm.addEventListener("submit", function(event){
    event.preventDefault()

    const form = event.target

    const name = form.name.value
    const image = form.image.value
    const likes = 0

    const newToy = { name,  image, likes}

    makeToy(newToy)

    fetch(baseUrl, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(newToy)
    })

    tForm.reset()
  })

  function makeToy(toy) { 
    const toyCard = document.createElement('div')
    toyCard.className = "card"
    toyCard.dataset.number = toy.id
    toyCard.innerHTML = `
    <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p> ${toy.likes} likes </p>
      <button class="like-btn">Like <3</button>
    `
     toyContainer.append(toyCard)
    }


  const likeBtns = document.querySelectorAll(".like-btn");

  document.addEventListener("click", function(e){
    let toy = e.target.parentNode
    let toyId = toy.dataset.number
    // console.dir(toyId) //CONSOLE ToyId

    // √ find toy associated with the like button 
    // √ get the toy id from dataset
    // √ baseurl + id
    // √ add 1 to likes 


      let toyLikes = toy.getElementsByTagName("p")[0].innerText
      console.log(toyLikes, "start")

      let newLikes = parseInt(toyLikes) +1; 

      let likesString = `${newLikes} Likes`;
      console.log(likesString, "finish")

      toy.getElementsByTagName("p")[0].innerText = likesString

      fetch(`${baseUrl}/${toyId}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify({likes: newLikes})
      })

    })

  })


  



