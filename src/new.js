//√get fetch render all toys 
//√show inside each card 
//√ <div class="card">

// √add a new toy add el to the button POST http://localhost:3000/toys, render the new toy
//√increase likes number add el to the like btn (e.preventDefault())
// // √PATCH newlike num// http://localhost:3000/toys/:id


document.addEventListener("DOMContentLoaded", ()=>{
    const baseUrl = "http://localhost:3000/toys"
    const toyCollection = document.querySelector("#toy-collection")
    const newToyBtn = document.querySelector("#new-toy-btn")
    const toyForm = document.querySelector(".container")
    let addToy = false
    newToyBtn.addEventListener('click', () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyForm.style.display = 'block';
        } else {
            toyForm.style.display = 'none';
        }
    });

      ////get the data 
    const getToys = () =>{                
        fetch(baseUrl)
        .then(r => r.json())
        .then(renderToys) 
    }

    //create a div and return a div,  helper method 
    const createToyDiv =(toy)=>{
        const div = document.createElement('div')
        div.innerHTML =`
        <h2>${toy.name}</h2>
        <img src=${toy.image}class="toy-avatar" />
        <p> ${toy.likes} likes</p>
        <button class="like-btn" data-id = ${toy.id}>Like <3</button>
        `       
        return div
    }

    // render all toys on the page, clear out the innerHTML each time when the data updated
    const renderToys =(toys)=>{
        toyCollection.innerHTML=''
        toys.forEach(toy =>{
            const div = createToyDiv(toy)
            div.className = "card"
            toyCollection.append(div)
            console.log(div)
        })
    }

    //add a new toy, get the info from form value 
    const addANewToy = () =>{
        document.addEventListener("submit", e=>{
            e.preventDefault()
            const form = document.querySelector(".add-toy-form")
            const name = form.name.value
            const image = form.image.value
            const likes = 0
            const newToy = {name,image,likes}
            fetch(baseUrl,{
                method:"POST",
                headers: {"accept" : "application/json",
                        "content-type" :"application/json"
                        },
                body: JSON.stringify(newToy)       
            })
            getToys()
            form.reset()
        })
    }
    
    addANewToy()

    //add likes , get the likes from p tag and increase by 1
    const addLikes = () =>{
        toyCollection.addEventListener("click", e=>{
            e.preventDefault()
            if(e.target.className === "like-btn"){
            const p = e.target.parentNode.children[2]
            const currentLikes = parseInt(p.textContent)
            const newlikes = currentLikes +1
            p.textContent = `${newlikes} likes`
            const id = e.target.dataset.id
                fetch(`http://localhost:3000/toys/${id}`,{
                    method:"PATCH",
                    headers: {"accept" : "application/json",
                            "content-type" :"application/json"
                            },
                    body: JSON.stringify({likes:newlikes})       
                })
            }
        })
    }
    addLikes()
    getToys()

})