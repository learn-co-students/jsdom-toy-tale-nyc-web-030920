let addToy = false;

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
  });

  const allToys = 'http://localhost:3000/toys'
  fetch(allToys)
  .then(response => response.json())
  .then(toys =>{
    toys.forEach(toy => renderToy(toy))
  })
  function renderToy(toy){
    const container = document.querySelector('#toy-collection')
    container.innerHTML += `
    <div class="card" data-num="${toy.id}">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>
    `  
  }
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', function(e){
    event.preventDefault()
    const newToys = 'http://localhost:3000/toys'
    fetch(newToys, {
      method: 'POST',
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": form.name.value,
        "image": form.image.value,
        "likes": 0
      })
      // form.reset()
    })
    
  })
  // const card = document.getElementsByClassName('card')
  // const toyArray = Array.from(card)
  // console.log(toyArray)
  // toyArray.forEach(toy => {
  //   document.addEventListener('click', function(e){
  //     event.preventDefault()
  //   const likeBtn = document.querySelector('.like-btn')
  //   console.log('clicked!')
  // })
  document.addEventListener('click', function(e){
    event.preventDefault()
    if (e.target.className === 'like-btn'){
      let card = e.target.parentElement
      let p = card.querySelector('p')
      let prevCount = parseInt(p.textContent)
      let id = parseInt(card.getAttribute('data-num'))
      const newCount = prevCount + 1
      p.textContent = `${newCount} likes`
      // count = p.textContent
      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": newCount
        })
      })
    }
  })
})
























































// let addBtn = document.querySelector("#new-toy-btn");
// let toyForm = document.querySelector(".container");
// addBtn.addEventListener("click", () => {
//  //hide & seek with the form
//   addToy = !addToy;
//   if (addToy) {
//    toyForm.style.display = "block";
//  } else {
//     toyForm.style.display = "none";
//   }
// });
// let toyCollection = document.getElementById("toy-collection")

// fetchToys()



// function fetchToys() {
// fetch('http://localhost:3000/toys')
// .then(resp => resp.json())
// .then(toys => renderToys(toys))
// }

// function renderToys(toys){
// toys.forEach(toy => addToyToCollection(toy))
// }

// function addToyToCollection(toy){
// let div = document.createElement("div")
// div.className = "card"
// div.innerHTML=`
// <h2>${toy.name}</h2>
// <img src=${toy.image} class="toy-avatar" />
// <p>${toy.likes}</p>
// <button class="like-btn">Like <3</button>`
// toyCollection.appendChild(div)
// }


// let  buttonNewToy = document.getElementsByClassName("add-toy-form")[0]
// buttonNewToy.addEventListener("submit", createToy)
// function createToy(event){
//  event.preventDefault()
// let toyName = event.target.name.value
// let toyImage = event.target.image.value
// let likes = 0 

// let newToy = {name: toyName, image: toyImage, likes: likes}

// fetch("http://localhost:3000/toys",{
//   method: "POST",
//   body: JSON.stringify(newToy),
//   headers: 
// {
// "Content-Type": "application/json",
// "Accept": "application/json"
// }
// })
// .then(r => r.json())
// buttonNewToy.reset()  

// }

// let likeButton = document.getElementsByClassName("like-btn")[0]
// debugger
// console.log(likeButton)

// likeButton.addEventListener('click', likeThing )

// function likeThing(event){
// console.log(event.target)

// }




// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyForm = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyForm.style.display = "block";
//     } else {
//       toyForm.style.display = "none";
//     }
//   });

//   const requestHeaders = {
//     "accept": "application/json",
//     "content-type": "application/json"
//   }
  
// let form = document.getElementsByClassName('add-toy-form')[0]

// form.addEventListener('submit', function(event){
//   event.preventDefault()
 
//   let toyName =  event.target.name.value
  
//   let toyImage = event.target.image.value

//   let likes = 0
//   const newObject = {
//     name: toyName , image: toyImage, likes: likes
//   }

//   fetch('http://localhost:3000/toys', { 
//     method: 'POST', 
//   body: JSON.stringify(newObject),
//   headers: requestHeaders
//   }) 
//   .then(response => response.json())
//   form.reset()
// })

//   fetch('http://localhost:3000/toys')
//   .then(response => response.json())
//   .then(toys => { 
   
//     toys.forEach(toy => createToy(toy))

//   })

//  function createToy(toyElement) {
//   let collection = document.getElementById('toy-collection')
//     let div =document.createElement('div')
//     div.className = "card"
//     let h2 = document.createElement('h2')
//     h2.innerText = toyElement.name 
//     let img = document.createElement('img')
//     img.className = "toy-avatar"
//     img.src = toyElement.image
//     img.alt = 'alt-text'

//     let p = document.createElement('p')
//     p.innerText = toyElement.likes 

//     let buttonTag = document.createElement('button')
//     buttonTag.className = 'like-btn'
//     buttonTag.innerText = 'like<3'
  
//     buttonTag.addEventListener('click', function(event){
//       event.preventDefault()
//       let newCount = parseInt(toyElement.likes) + 1
//       p.innerText = newCount
//       fetch(`http://localhost:3000/toys/${toyElement.id}`, { 
//       method: 'PATCH', 
//       body: JSON.stringify({'likes': newCount}),
//       headers: requestHeaders
     
//       }) 
//     })
     
//     div.appendChild(h2)
//     div.appendChild(img)
//     div.appendChild(p)
//     div.appendChild(buttonTag)
//     collection.appendChild(div)
//     console.log(collection)

//  } 

// });
