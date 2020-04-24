let addToy = false;
const baseURL = "http://localhost:3000/toys/";


document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
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

  toyForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let toy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }

    fetch(baseURL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify(toy)
    })
    location.reload();
  })
  document.addEventListener('click', function (event) {
    if (event.target.className === "like-btn") {
      addLike(event);
    }
  })

});


let addLike = function(event) {
  let likes = event.target.parentNode.querySelector("p");
  let num = likes.innerText.split(" ")[0];
  num++;
  likes.innerText = `${num} Likes`;

  const baseURL = `http://localhost:3000/toys/${event.target.parentNode.dataset.id}`
  fetch(baseURL, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify({ likes: num })
  })
}


function fetchToys() {
  fetch(baseURL)
    .then(function (response) {
      return response.json();
    })
    .then(toys => {
      toys.forEach(toy => createCard(toy))
    });
}

function createCard(toy) {
  const toyCollection = document.querySelector('#toy-collection');
  let card = document.createElement('div');
  card.class = 'card';
  card.innerHTML = `<h2>${toy['name']}</h2>
      <img src=${toy['image']} class="toy-avatar" />
      <p>${toy['likes']} Likes </p>
      <button class="like-btn">Like <3</button>`
  card.dataset.id = toy.id;
  toyCollection.append(card);
}


