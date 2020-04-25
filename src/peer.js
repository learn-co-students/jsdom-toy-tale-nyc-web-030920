//state variable
//set to false to match default CSS styling of display === none for div.container
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  //grab add button by id 
  const addBtn = document.querySelector("#new-toy-btn");

  //grab form by parent div class name
  //div.container is controlling the display of the form
  //CSS sets it to none on default
  const toyForm = document.querySelector(".container");

  //add an event listener on the add button
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    //toggles the form true/false or show form/hide form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block"; //show form
    } else {
      toyForm.style.display = "none"; //hide form
    }
  });

  //grab the div where the toys will be appended to when added via the form
  const toyDiv = document.getElementById('toy-collection');
  //fetch get request to the API
  fetch('http://localhost:3000/toys')
  .then((resp) => resp.json())
  .then((data) => {
    // after parsing the array of toys from the API
    //run a forEach 
    data.forEach(function(toy){
    
      let newDiv = document.createElement('div')
  
      newDiv.className = 'card'
      newDiv.dataset.id = toy.id
      newDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
      `
      toyDiv.appendChild(newDiv)
    })
  })

  toyForm.addEventListener('submit', event => {
    event.preventDefault()
    let toyDiv = document.getElementById('toy-collection')
    let nameInput = document.getElementsByClassName('input-text')[0].value
    let imageInput = document.getElementsByClassName('input-text')[1].value

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },

      body: JSON.stringify({
        name: nameInput,
        image: imageInput,
        likes: 0
      })
    })
    .then((resp) => resp.json())
    .then((data) => {
      let newDiv = document.createElement('div')
      newDiv.className = 'card'
      newDiv.dataset.id = data.id
      newDiv.innerHTML = `
      <h2>${data.name}</h2>
      <img src=${data.image} class="toy-avatar" />
      <p>${data.likes} Likes </p>
      <button class="like-btn">Like <3</button>
      `
      toyDiv.appendChild(newDiv)
    })
  }) 

  document.addEventListener('click', function(event){
    if (event.target.className === 'like-btn') {
      let btn = event.target 
      let parent = btn.parentNode
      let id = parent.dataset.id
      let pTag = parent.querySelector('p')
      let likes = parseInt(pTag.innerText)

      likes++
      pTag.innerText = `${likes} likes`

      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        
        body: JSON.stringify({likes})
      })
      .then(resp => resp.json())
      .then(console.log)
    }
  })
});
