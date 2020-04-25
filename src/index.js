//grab the add toy form
const addBtn = document.getElementById('new-toy-btn');

//grab the DIV that contains the form 
//need to grab the DIV since it's hiding the form via its display property set to none
//use querySelector to grab the first HTML element with the class name ==== container
//displaying the div with class name 'container' will display the
//children of the div AKA the form
const formDiv = document.querySelector('.container');

//create a state variable to display/hide the form
//set to false to match the default state of the display of the DIV containing the form from the CSS styling 
let showForm = false;

//toggles the state variable showing/hiding the form
const toggleFormDisplay = () => {
  //inverts the state variable
  showForm = !showForm
  if (showForm) {
    //if showForm is true, switch the display styling to true
    //will render the form on the page
    formDiv.style.display = 'block';
  } else {
    formDiv.style.display = 'none';
  }
}

//function expression to get all initial data from database
//returns array of toy objects
// { 
//   id: 1,
//   image: "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
//   likes: 31,
//   name: "Woody" 
// }
const getToys = () => {
  return fetch('http://localhost:3000/toys').then(resp => resp.json())
}

//function expression to create toy elements and append to the main toy DIV
const renderToyHTML = (toyObj) => {
  const div = document.createElement('div');
  div.className = 'card';

  const h2 = document.createElement('h2');
  h2.innerText = toyObj.name;

  const img = document.createElement('img');
  img.src = toyObj.image;
  img.className = 'toy-avatar';

  const p = document.createElement('p');
  p.innerText = `Likes: ${toyObj.likes}`;

  const button = document.createElement('button');
  button.className = 'like-btn';
  button.id = toyObj.id
  button.innerText = 'Like ❤️'

  //append can add multiple elements
  div.append(h2, img, p, button)
  //appendChild can only add one element at a time
  toyCollectionDiv.appendChild(div)
}

const postToy = () => {
  //need to post a new added toy to the database
  //need to grab the input fields and submit button of the form
  const nameInput = document.querySelector('input[name="name"]').value;
  const imgInput = document.querySelector('input[name="image"]').value;
  
  //fetch returns a promise object
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput,
      image: imgInput,
      likes: 0
    })
  })
  .then(resp => resp.json()) //the return value is then parsed 
  .then(toyObj => renderToyHTML(toyObj)) //and rendered via the method

  //toggle display to hide it
  toggleFormDisplay()
}

//function to increase the like optimistically
//render the increased like before receiving resolved status from server
const addLike = (id) => {
  const button = document.getElementById(`${id}`)
  const p = button.previousElementSibling
  //slice removes the 'Like: ' characters leaving only the number value
  let likes = parseInt(p.innerText.slice(7));
  
  //add a like
  likes++

  //optimistic rendering
  p.innerText = `Likes: ${likes}`;

  //PATCH request to update likes attribute
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      //toy object attribute
      likes
    })
  })
  
  //pessimistic rendering
  // .then(resp => resp.json())
  // .then(toyObj => {
  //   p.innerText = `Likes: ${toyObj.likes}`
  // })
}

//grab the main toy DIV that will append the individual toy DIVs
const toyCollectionDiv = document.getElementById('toy-collection');

//grab the form to submit new toy data
const formSubmitBtn = document.querySelector('.add-toy-form');

//append each toy obj to the DOM
getToys().then(toysArry => {
  toysArry.forEach(renderToyHTML);
});

//need to make a POST fetch request to submit information to database
formSubmitBtn.addEventListener('submit', event => {
  event.preventDefault();

  postToy();
})

//event delegation
//document listens for when a like button is clicked
//passes the buttons id to the addLike function
//also listens for when the add new toy button is clicked
//toggles the view 
document.addEventListener('click', event => {
  console.dir(event.target)
  if (event.target.className === 'like-btn') {
    addLike(event.target.id)
    //since CSS styling for the DIV containing the form is set to 'none'
    //CANNOT grab the form directly
    //add event listener to the button to display the form by changing the display
    //status of the DIV
  } else if (event.target.id === 'new-toy-btn') {
    toggleFormDisplay()
  } 
})
