let addToy = false;
const baseURL = "http://localhost:3000/toys" 

  document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    const toyContainer = document.querySelector('#toy-collection')
    const newToyForm = document.querySelector('.add-toy-form')
    

    const fetchToys = () => {
      fetch(baseURL)
      .then(response => response.json())
      .then(toys => renderToys(toys)) 
    };
    
    const renderToys = (toys) => {
      toys.forEach(toy => {
        toyContainer.innerHTML += `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p>${toy.likes} Likes </p>
          <button data-id=${toy.id} class="like-btn">Like <3</button>
          <button data-id=${toy.id} class="delete-btn">DELETE</button>
        </div>
        `
      })
    };

    const addNewToy = () => {
      newToyForm.addEventListener('submit', function(event){
        event.preventDefault()
        let newToyName = event.target.name.value
        let newToyImage = event.target.image.value

        fetch(baseURL, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: newToyName,
            image: newToyImage,
            likes: 0
          })
        })
        .then(response => response.json())
        .then(newToy => renderNewToy(newToy))
      })
    };
    
    const renderNewToy = (newToy) => {
      toyContainer.innerHTML += `
      <div class="card">
      <h2>${newToy.name}</h2>
      <img src=${newToy.image} class="toy-avatar" />
      <p>${newToy.likes} Likes </p>
      <button data-id=${newToy.id} class="like-btn">Like <3</button>
      <button data-id=${newToy.id} class="delete-btn">DELETE</button>
      </div>
      `
      newToyForm.reset()
    };

    const addLikes = () => {
      toyContainer.addEventListener('click', function(event){
        let button = event.target
        if(button.className === 'like-btn'){
          updateLikes(button)
        }
        if (button.className === 'delete-btn'){
          deleteToy(button)
        }
      }) 
    };
    
    const updateLikes = (button) => {
      let toyLikes = parseInt(button.previousElementSibling.textContent)
      let newLikes = toyLikes + 1 
      button.previousElementSibling.textContent = newLikes + ' Likes'
      fetch(`http://localhost:3000/toys/${button.dataset.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })
    };
    
    const deleteToy = (button) => {
      button.parentElement.remove()
      fetch(`http://localhost:3000/toys/${button.dataset.id}`, {
        method: 'DELETE'
      })
    };
    
    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
        toyFormContainer.style.display = "block";
      } else {
        toyFormContainer.style.display = "none";
      }
    });
    
    fetchToys()
    addNewToy()
    addLikes()
  //end of DOMContentLoaded  
  });
