const gridEl = document.getElementById("grid-container");
const selectEl = document.getElementById("select-container");
const articleItem = {
    title: document.getElementById("article-title"),
    body: document.getElementById("article-body"),
    image: document.getElementById("article-img"),
};

const setup = {
    starYear: 2008,
    endYear: 2022,
};

let events = {};

function toggleHiddenSection() {
    let classList = selectEl.classList.value.split(" ");
    if (classList.includes("hide-container")) selectEl.classList.remove("hide-container");
    else selectEl.classList.add("hide-container");
}

for (let year = setup.starYear; year <= setup.endYear; year++) {
    const gridButton = document.createElement("button");
    gridButton.innerText = year;
    gridButton.id = `btn-id-${year}`;
    gridEl.appendChild(gridButton);
}

function changeArticle(id) {
    articleItem["title"].innerText = events[id]["title"];
    articleItem["body"].innerText = events[id]["body"];
    articleItem["image"].src = `img/${events[id]["img"]}`;
}

function assignEvents(data) {
    const loadingScreen = document.getElementById("loader");
    events = data;
    changeArticle(0);
    loadingScreen.remove();
}

fetch("events.json")
    .then((response) => response.json())
    .then((data) => assignEvents(data));
