const player = document.getElementById("video-player");
const inputField = document.getElementById("player-input");
const submitButton = document.getElementById("submit-btn");
let videoID = null;

const searchOptions = {
    includeScore: true,
    threshold: 0.15,
};

let movies = [
    { title: "Spectre", src: "kEnK0ZdMThc", alt: ["James Bond"] },
    { title: "John Wick 2", src: "qIalODmFrZk", alt: ["John Wick"] },
    { title: "Baby Driver", src: "7ARFyrM6gVs", alt: [""] },
    { title: "Taken", src: "jZOywn1qArI", alt: [""] },
    { title: "The Social Network", src: "2BE2XhnZ_4g", alt: [""] },
    { title: "Avengers: Infinity War", src: "EpI3x6gf2uA", alt: ["Infinity War", "Avengers Infinity War"] },
    { title: "Spider-man: Into the spider-verse", src: "oJyz1snRgOU", alt: ["spiderman Into the spiderverse", "Spiderman", "Into the spider verse", "Into the spiderverse"] },
    { title: "Avengers: Endgame", src: "tdMaz-x8BAI", alt: ["Endgame"] },
    { title: "X-Men: Days of future past", src: "T9GFyZ5LREQ", alt: ["xmen", "days of future past"] },
    { title: "Deadpool", src: "tLmStxxzhkI", alt: [""] },
    { title: "Tenet", src: "4xj0KRqzo-0", alt: [""] },
    { title: "The Dark Knight", src: "nyepdtx_UI4", alt: [""] },
    { title: "Inception", src: "TAbbJT0ZXmk", alt: [""] },
    { title: "The Avengers", src: "SLD9xzJ4oeU", alt: ["Avengers"] },
    { title: "Mission Impossible: Ghost Protocol", src: "qtA0JS1lBaY", alt: ["Mission Impossible", "Ghost Protocol"] },
    { title: "Mission Impossible: Fallout", src: "hhLIwmgx3vI", alt: ["Mission Impossible", "Fallout"] },
    { title: "Legend", src: "zZ7AWVKbPWY", alt: [""] },
    { title: "The Matrix", src: "zE7PKRjrid4", alt: [""] },
    { title: "Madagascar", src: "kPE7ZCGjw4o", alt: [""] },
    { title: "Bee Movie", src: "L46syxgju18", alt: [""] },
    { title: "How to train your dragon", src: "nPmIhH775L4" },
];

function changeButton(mode) {
    if (mode == "next") {
        submitButton.onclick = function () {
            changeSRC();
            changeButton("reveal");
        };
        submitButton.innerText = "Next Video";
        submitButton.style.background = "Green";
        submitButton.focus();
    } else {
        submitButton.onclick = function () {
            revealAnswer();
        };
        submitButton.innerText = "Reveal Answer";
        submitButton.style.background = "Red";
        inputField.focus();
    }
}

function revealAnswer() {
    inputField.style.color = "rgb(0,0,240)";
    inputField.style.textAlign = "center";
    inputField.disabled = "true";
    inputField.value = movies[videoID]["title"];
    movies.splice(videoID, 1);
    changeButton("next");
}

function changeSRC() {
    videoID = Math.floor(Math.random() * movies.length);
    let newSRC = `https://www.youtube.com/embed/${movies[videoID]["src"]}?autoplay=1&modestbranding=1&controls=0&mute=0&rel=0`;
    player.src = newSRC;
    inputField.style.color = "rgb(0,0,0)";
    inputField.style.textAlign = "left";
    inputField.disabled = false;
    inputField.value = "";
    console.log(videoID, movies[videoID]["src"]);
}

function playLast() {
    videoID = movies.length - 1;
    let newSRC = `https://www.youtube.com/embed/${movies[videoID]["src"]}?autoplay=1&modestbranding=1&controls=0&mute=0&rel=0`;
    player.src = newSRC;
}

function compareString(inputString, comparisonList) {
    var score = 1;
    const fuse = new Fuse(comparisonList, searchOptions);
    const fuseSearch = fuse.search(inputString)[0];
    if (fuseSearch) {
        const fuseScore = fuseSearch["score"];
        const lengthScore = Math.abs(inputString.length - fuseSearch["item"].length) / fuseSearch["item"].length;
        score = (fuseScore + lengthScore) / 2;
    }
    console.log(`Score: ${score}`);
    return score;
}

function checkAnswer() {
    var titleAnswers = [];
    titleAnswers.push(movies[videoID]["title"]);
    if (movies[videoID]["alt"]) {
        for (let k = 0; k < movies[videoID]["alt"].length; k++) {
            titleAnswers.push(movies[videoID]["alt"][k]);
        }
    }
    score = compareString(inputField.value, titleAnswers);
    console.log(titleAnswers);
    if (score < 0.1) {
        inputField.style.color = "rgb(0,128,0)";
        inputField.style.textAlign = "center";
        inputField.disabled = true;
        inputField.value = movies[videoID]["title"];
        movies.splice(videoID, 1);
        changeButton("next");
    } else if (score < 0.25) {
        inputField.style.color = "Orange";
    } else {
        inputField.style.color = "Red";
    }
}

changeSRC();
