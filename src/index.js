document.addEventListener("DOMContentLoaded", () => {
  let addToy = false
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector(".container");
  const toyUrl = "http://localhost:3000/toys"
  const requestHeader = { "Content-Type": "application/json",
  "Accept": "application/json" }
  const toyCollection = document.getElementById("toy-collection")
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
        toyForm.style.display = 'block';
    } else {
        toyForm.style.display = 'none';
    }
  });
  // --------------------------
  getToys()
  function getToys(){
    fetch(toyUrl)
    .then(r=> r.json()) 
    .then(renderToys)
  } 

  function renderToys(toys){
    toyCollection.innerHTML = ""
    toys.forEach(toy=>{
      let newDiv = document.createElement("div")
      newDiv.className = "card"
      newDiv.innerHTML = ` 
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p> ${toy.likes}</p>
      <button class="like-btn">Like <3</button>`
      newDiv.id = `${toy.id}`
      toyCollection.append(newDiv)  
    })
  }
  document.addEventListener("click",function(event){
  event.preventDefault()
    if(event.target.className === "like-btn"){
      let newDiv = event.target.parentNode 
      let id = newDiv.id
      const likeCount = newDiv.getElementsByTagName("p")
      let newCount = parseInt(likeCount[0].innerHTML) + 1;
      likeCount[0].innerHTML = newCount;  
            
      fetch(`${toyUrl}/${id}`, {
        method: "PATCH", 
        headers: requestHeader,
        body: JSON.stringify({ "likes": `${newCount}`})
      })
    }
  })
  
  const createBtn= document.querySelector(".submit")
  createBtn.addEventListener("click", function(event){
    const form = event.target.parentNode
    const name = form.name.value
    const image = form.image.value
    const likes = 0
    const newToy = {name, image, likes}
    fetch(toyUrl, {
      method: "POST", 
      headers: requestHeader,
      body: JSON.stringify(newToy)

    })
    .then(r=>r.json())
    .then(getToys)
  form.reset()
  })
  
  
   
})

   

   
  

  


