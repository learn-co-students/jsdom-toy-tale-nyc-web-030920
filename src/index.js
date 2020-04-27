let addToy = false;
const toyUrl = "http://localhost:3000/toys"
const divToyCollection = document.querySelector('#toy-collection')
const addToyButton = document.getElementById('new-toy-btn')
const inputName = document.getElementsByClassName('input-text')[0]
const inputImg = document.getElementsByClassName('input-text')[1]
const submitButton = document.getElementsByClassName('submit')[0]



document.addEventListener("DOMContentLoaded", () => {
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
  })
  fetchToys()
  postToy()
});

function fetchToys() {             // Get the hash from the API 
  fetch(toyUrl)
    .then(resp => resp.json())      // Set it to readable hash
    .then(json => getToyNames(json)) // Appends Each Toy Name to div Toy Collection 
}

function getToyNames(array) {  // Created Cards with Info for Each toy
  array.forEach(hash => {
    addToyToDOM(hash)
  })
  const likeButton = document.querySelectorAll('.like-btn')

  // A D D  L I K E  F U N C T I O N  L O G I C

  likeButton.forEach(element => {
    element.addEventListener('click', event =>{
      // get parent nod of event target then find p element. Inner text is what we want to change
      let parentDiv = event.target.parentNode
      let numbElement = parentDiv.querySelector('p')
      let name = parentDiv.querySelector('h2').innerText
      let likes = parseInt(numbElement.innerText)
      let id = event.target.id
      likes ++
      numbElement.innerText = `${likes} Likes`
      
      fetch(`http://localhost:3000/toys/${id}`,{
        method:'PATCH',
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        },
        body: JSON.stringify({
          likes: likes
        })
      }).then(res => res.json())
      .then(json => {numbElement.innerText = `${json.likes} Likes`
      console.log(json)})
    })
  })
  }

function addToyToDOM(hash) {
  let divNew = document.createElement('div') // <div> </div>
  divNew.className = "card"                 // <div class = "card"> </div>
  divToyCollection.append(divNew)           // <DIV> <div class = "card"> </div> </DIV>

  divNew.innerHTML =
    `<h2>${hash.name}</h2>
    <img src=${hash.image} class="toy-avatar" />
    <p>${hash.likes} Likes </p>
    <button class="like-btn" id=${hash.id}>Like <3</button>`
}

function postToy() {
  submitButton.addEventListener('click', event => {
    event.preventDefault() // prevent the default of it being a GET 
    fetch(toyUrl, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: inputName.value,
        image: inputImg.value,
        likes: 0
      })
    })
      .then(resp => resp.json())
      .then(hash => addToyToDOM(hash))

    inputName.value = inputName.placeholder
    inputImg.value = inputImg.placeholder
  })
}






