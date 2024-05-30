let cardArea = document.getElementById("cardArea");

const allBtn = document.getElementById("allBtn");
const availableBtn = document.getElementById("availableBtn");

allBtn.addEventListener("click", allBtnClicked);
availableBtn.addEventListener("click", availableBtnClicked);

allBtnClicked();

function allBtnClicked() {
  availableBtn.style.backgroundColor = "transparent";
  allBtn.style.backgroundColor = "#6F757C";
  cardArea.innerHTML = "";
  fectchData(true);
}
function availableBtnClicked() {
  allBtn.style.backgroundColor = "transparent";
  availableBtn.style.backgroundColor = "#6F757C";
  cardArea.innerHTML = "";
  fectchData(false);
}

function fectchData(all) {
  fetch("https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json")
  .then(res => res.json())
  .then(
    data => {
      console.log(data)
      if (all) {
        for (let i = 0; i < data.length; i++) {
          cardArea.innerHTML += renderCard(
            { name: data[i].name,
              price: data[i].price,
              image: data[i].image,
              rating: data[i].rating,
              votes: data[i].votes,
              popular: data[i].popular,
              available: data[i].available});
        }
      }
      else {
        for (let i = 0; i < data.length; i++) {
          if (data[i].available === false) continue
          else {
            cardArea.innerHTML += renderCard(
              { name: data[i].name,
                price: data[i].price,
                image: data[i].image,
                rating: data[i].rating,
                votes: data[i].votes,
                popular: data[i].popular,
                available: data[i].available});
          }
        }
      }
    } 
  )
}



function renderCard(Param) {
  let temp = ``;
  temp += 
  `
  <div class="cards">
    <div class="img-row">
  `
  if (Param.popular) {
    temp += 
    `
      <p>Popular</p>
    `
  }
  temp +=
  ` 
      <img src="${Param.image}" alt="${Param.name}">
    </div>
    <div class="coffee-row">
      <div>${Param.name}</div>
      <div>${Param.price}</div>
    </div>
    <div class="rating-row">
      <div class="rating">
  `
  if (Param.rating === null) {
    temp += 
    `
        <img src="/images/Star.svg" alt="Star">
    `
  }
  else {
    temp += 
    `
        <img src="/images/Star_fill.svg" alt="Star">
    `
  }
  temp += 
  `  
    <span>
  `
  if (Param.rating === null) {
    temp += `No ratings`
  } else {
    temp += `${Param.rating}(${Param.votes} votes)`
  }
  temp += 
  `
        </span>
      </div>
  `
  if (!Param.available) {
    temp += 
    `
    <span>
      Sold out
    <span>
    `
  }
  temp +=
  `
    </div>
  </div>
  `
  return temp;
}