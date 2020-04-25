let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  const requestHeaders = {
    "accept": "application/json",
    "content-type": "application/json"
  }
  
let form = document.getElementsByClassName('add-toy-form')[0]

form.addEventListener('submit', function(event){
  event.preventDefault()
 
  let toyName =  event.target.name.value
  
  let toyImage = event.target.image.value

  let likes = 0
  const newObject = {
    name: toyName , image: toyImage, likes: likes
  }

  fetch('http://localhost:3000/toys', { 
    method: 'POST', 
  body: JSON.stringify(newObject),
  headers: requestHeaders
  }) 
  .then(response => response.json())
  form.reset()
})

  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => { 
   
    toys.forEach(toy => createToy(toy))

  })

 function createToy(toyElement) {
  let collection = document.getElementById('toy-collection')
    let div =document.createElement('div')
    div.className = "card"
    let h2 = document.createElement('h2')
    h2.innerText = toyElement.name 
    let img = document.createElement('img')
    img.className = "toy-avatar"
    img.src = toyElement.image
    img.alt = 'alt-text'

    let p = document.createElement('p')
    p.innerText = toyElement.likes 

    let buttonTag = document.createElement('button')
    buttonTag.className = 'like-btn'
    buttonTag.innerText = 'like<3'
  
    buttonTag.addEventListener('click', function(event){
      event.preventDefault()
      let newCount = parseInt(toyElement.likes) + 1
      p.innerText = newCount
      fetch(`http://localhost:3000/toys/${toyElement.id}`, { 
      method: 'PATCH', 
      body: JSON.stringify({'likes': newCount}),
      headers: requestHeaders
     
      }) 
    })
     
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(buttonTag)
    collection.appendChild(div)
    console.log(collection)

 } 
});
