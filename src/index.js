
let toyContainer = null
let addToy = false;
const toyURL = "http://localhost:3000/toys"
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json"
}

/*
IDEAS
*/


// interact with element =>(setup event listener)
// make fetch call
// update the dom

// use dataset data-likes that keeps number in it's own string. otherwise you'd have to
// slice the string and string content could change from front end. 


////////////////
////////////////
// BEGIN
////////////////
////////////////

document.addEventListener("DOMContentLoaded", () => {
  toyContainer = document.getElementById('toy-collection')
  toggleButtonSetup()
  formSubmitSetup()
  likeButtonSetup()
  fetchToys()

});

///////////////////////////////////////
///////////////////////////////////////
// NEW TOY
///////////////////////////////////////
///////////////////////////////////////

//
//

function toggleButtonSetup() {
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
}

//
//

function formSubmitSetup () {
  
  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const newToy = createToyFromForm(toyForm)
    postToy(newToy)
    // need postToy to render the toy via 'POST' to DOM
  })
}

//
//
// fetch request / setup Step. this is used by fetch request process. 
// need to make something before sending
// you want to run a post make the thing you are supposed to be posting
//

function createToyFromForm(toyForm) {
  const newToy = {
    name: toyForm.name.value,
    image: toyForm.image.value,
    likes: 0
  }
  toyForm.reset()
  return newToy
}

//
//

function postToy (newToy) {
  // adds to db doesn't render. but render happens in .then data=> {}
  fetch(toyURL, {
    headers,
    method: 'POST',
    body: JSON.stringify(newToy)
  }) //backend POST 
  .then(resp => resp.json()) // rendering to DOM
  .then(toy => {
    console.log("data:", toy)
    // const toyContainer = document.getElementById('toy-collection')
    addCard(toy, toyContainer)
  })
  .catch(err => console.log("error:", err))
}

///////////////////////////////////
///////////////////////////////////
// LIKES
///////////////////////////////////
///////////////////////////////////

//
//

// event delegation happening in likebutton

function likeButtonSetup () {
  toyContainer.addEventListener("click", (event) => {
    if (event.target.className === "like-btn") {
      addLike(event.target.parentNode)
    }

  })
}

//
//

function addLike (toyCard) {
  console.log(toyCard)
  const p = toyCard.querySelector('p')
  const newLikes = parseInt(p.dataset.likes) + 1
  const toyId = p.dataset.id

  fetch(`${toyURL}/${toyId}`, {  // this is the restful path for PATCH toyURL/:id
    headers,
    method: 'PATCH',
    body: JSON.stringify({
      "likes": newLikes
    })
  }) // backend
  .then(resp => resp.json()) // rendering to DOM
  .then(toy => {
    console.log("data:", toy)
    p.dataset.likes = newLikes // on dom it hasn't been updated
    p.textContent = `${toy.likes} Likes`
  })
  .catch(err => console.log("error:", err))
}

/////////////////////////////
/////////////////////////////
// GET AND DISPLAY TOYS
/////////////////////////////
/////////////////////////////

//
//

function fetchToys() {
  fetch(toyURL)
  .then(resp => resp.json()) // parsed json makes json obj a js obj
  .then(toys => renderToys(toys))
}

//
//
// fetch toy objects from json 
// update the DOM //


function renderToys(toys) {
  // const toyContainer = document.getElementById('toy-collection')
  toys.forEach(toy => {
    addCard(toy, toyContainer)
  });
}

//
//

function addCard (toy, toyContainer) {
  const cardDiv = document.createElement('div')
  cardDiv.setAttribute('class', 'card')
  cardDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p data-id="${toy.id}" data-likes="${toy.likes}">${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  `
  toyContainer.append(cardDiv)
}
