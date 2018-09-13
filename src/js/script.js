require("babel-core/register");
require("babel-polyfill");

const DATA_URI = `https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/LazzyGuy/js-scraping-example/master/data/high.json`;
let data = {};
let load = document.querySelector(".load");

let searchbar = document.querySelector("#search");
searchbar.addEventListener("keyup", searchData);

// setInterval(() => {
//   if (searchbar.value == "") {
//     insert(data, 10);
//   }
// }, 1000);

function searchData(event) {
  let x = event.keyCode || event.which;
  let v = searchbar.value;
  if (x == "13") {
    console.log("enter");
    display.innerHTML = "";
    load.style.display = "";
    let rx = new RegExp(v, "gi");
    let newObj = data.filter(
      e =>
        rx.test(e.NAME.toString().toLowerCase()) || rx.test(e.ROLLNO.toString())
    );
    if (newObj.length == 0) {
      console.log("noting");
    } else {
      insert(newObj, newObj.length);
    }
  }
}

const request = async () => {
  const response = await fetch(DATA_URI);
  const json = await response.json();
  data = json;
  insert(data, 10);
  load.style.display = "none";
};
request();

function insert(data, amount) {
  for (let e = 0; e < amount; e++) {
    createCard(data[e].NAME, data[e].rank, data[e].TOTAL);
  }
}

let display = document.querySelector(".display__container");
function createCard(name, rank, total) {
  const IMG_URI = `https://robohash.org/`;
  let UImg = name => IMG_URI + name;

  //selecting container

  let item = document.createElement("div");
  item.classList.add("item");

  let imgDiv = document.createElement("div");
  imgDiv.classList.add("img");
  let img = document.createElement("img");
  img.src = UImg(name);
  imgDiv.appendChild(img);

  let nam = document.createElement("div");
  nam.classList.add("name");
  let namh1 = document.createElement("h1");
  namh1.innerText = name;
  nam.appendChild(namh1);

  let rankdiv = document.createElement("div");
  rankdiv.classList.add("rank");
  let rankh1 = document.createElement("h1");
  rankh1.innerText = `#${rank.toString()}`;
  rankdiv.appendChild(rankh1);

  let totaldiv = document.createElement("div");
  totaldiv.classList.add("total");
  let totalh1 = document.createElement("h1");
  totalh1.innerText = `CGPA: ${total.toString()}`;
  totaldiv.appendChild(totalh1);

  item.appendChild(imgDiv);
  item.appendChild(nam);
  item.appendChild(rankdiv);
  item.appendChild(totaldiv);

  display.appendChild(item);
}
