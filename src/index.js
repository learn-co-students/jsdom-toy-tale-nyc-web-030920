let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.querySelector('#new-toy-btn');
    const toyForm = document.querySelector('.container');
    addBtn.addEventListener('click', () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyForm.style.display = 'block';
        } else {
            toyForm.style.display = 'none';
        }
    });
    //-----------------------------------------------------------------------------
    fetch('http://localhost:3000/toys')
        .then((resp) => resp.json())
        .then((data) => {
            let mainDive = document.getElementById('toy-collection');
            data.forEach(function (toy) {
                let div = document.createElement('div');
                div.className = 'card';
                div.dataset.id = toy.id;
                div.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class='toy-avatar'>
      <p>${toy.likes}</p>
      <button class='like-btn'>Like <3</button>
      `;
                mainDive.appendChild(div);
    //------------------------------------------------------------

    

            });
        });
//---------------------------------------------------------------
    document.addEventListener('submit', function (e) {
        e.preventDefault();
        let name = event.target.name.value;
        let image = event.target.image.value;

        fetch('http://localhost:3000/toys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                name,
                image,
                likes:0,
            }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
            });
    });
    //------------------------------------------------------------------------
let btn=document.getElementsByClassName("like-btn")
document.addEventListener("click",function(e){

    if(e.target.className=== "like-btn"){
        e.preventDefault()
      let button=e.target

      let parent=button.parentNode
      let id=parent.dataset.id
      let p =parent.querySelector("p")
      let likes=parseInt(p.innerText)
      likes++
      p.innerText=`${likes} likes`

      fetch(`http://localhost:3000/toys/${id}`,{
  
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept":"application/json"
      },
      body:JSON.stringify({likes})
      })
      .then(response => response.json())
      .then(console.log)

    }

})





});
