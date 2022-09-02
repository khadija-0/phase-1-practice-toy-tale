let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    //hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.getElementsByClassName.display = "block";
    }else {
      toyFormContainer.getElementsByClassName.display = "none";
    }
    });
  });



document.querySelector('.add-toy-form').addEventListener('submit', handleSubmit)

function handleSubmit(e){
  e.preventDefault()
  let toyObj = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes:0
  }
  renderToys(toyObj)

}

function getToys(){
fetch('http://localhost:3000/toys')
.then(res => res.json())
.then(toys => toys.forEach(toy => renderToys(toy)))
}

function renderToys(toy){
  

  let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes}</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>`

    card.querySelector('.like-btn').addEventListener('click', () => {
      toy.likes+= 1
      card.querySelector('p').textContent = toy.likes
      updateLikes(toy)
    })

    document.querySelector('#toy-collection').appendChild(card)


}

function updateLikes(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: "PATCH",
    headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
},

body: JSON.stringify(toyObj)
})
.then(res => res.json())
.then(data => console.log(data))

  
}

function newToy(toyObj) {
  fetch('http://localhost:3000/toys',{
    method:"POST",
    headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
},

body:JSON.stringify(toyObj)
  })
.then(res => res.json())
.then(data => console.log(data))

}
getToys()