//Ne koristimo async funkciju koja uvijek ide uz await iz razloga sto smo stavili type = "module"
const petPromise = await fetch(
  "https://learnwebcode.github.io/pet-adoption-data/pets.json"
);
if (!petPromise.ok) {
  throw new Error(`Greška: ${petPromise.status} - ${petPromise.statusText}`);
}
const pets = await petPromise.json();

const template = document.querySelector("#animal-card");
const wrapper = document.createElement("div");

function decideAgeText(age) {
  if (age < 1) {
    return "Less than a year old";
  }
  return age > 1 ? `${age} years old` : "1 year old";
}

pets.forEach((pet) => {
  const clone = template.content.cloneNode(true);

  clone.querySelector("h3").textContent = pet.name;
  clone.querySelector("img").src = pet.photo;
  clone.querySelector("img").alt = `A ${pet.species} named ${pet.name}`;

  const age = new Date().getFullYear() - pet.birthYear;
  const ageText = decideAgeText(age);

  clone.querySelector(".age").textContent = ageText;
  clone.querySelector(".species").textContent = pet.species;
  clone.querySelector(".description").textContent = pet.description;
  clone.querySelector(".adoptbtn").textContent = pet.name;
  clone.querySelector(".primary-btn").href = `https://learnwebcode.github.io/pet-adoption-data/pets/${pet.id}/`;

  wrapper.appendChild(clone);
});

document.querySelector(".animals").appendChild(wrapper);

//Oznacavanje filterNav kartice Pocetak
const filterButtons = document.querySelectorAll(".filter-nav a")
filterButtons.forEach(el => {
    el.addEventListener("click", e => handleFilterClick(e))
})

function handleFilterClick(e){
    let target = e.target

    if(e.target.classList.contains("only-large-screen")){
        target = e.target.closest("a")
    }

    e.preventDefault()
    filterButtons.forEach(el =>{
        el.classList.remove("active")
    })
    target.classList.add("active")
    //Kraj
    //e - event, target - ciljani element na kojim se dogodio dogadjaj, a filter ispod jeste zapravo data-filter sa htmla
    filterPets(target.dataset.filter)
}

function filterPets(species){
    const allPets = document.querySelectorAll(".animal-card")
    if(species == "all"){
        allPets.forEach(el =>{
            el.style.display = ""
        })
    }else{
        allPets.forEach(el =>{
            if(el.querySelector(".species").textContent == species){
                el.style.display = ""
            }
            else{
                el.style.display = "none"
            }
        })
    }
}

