const player = document.getElementById("video-player");
const inputField = document.getElementById("player-input");
const submitButton = document.getElementById("submit-btn");

let videoID = null;

const searchOptions = { includeScore: true, threshold: 0.15 };

let movies = [
    { title: "Spectre", src: "kEnK0ZdMThc", alt: ["James Bond"] },
    { title: "John Wick 2", src: "qIalODmFrZk", alt: ["John Wick"] },
    { title: "Baby Driver", src: "7ARFyrM6gVs" },
    { title: "Taken", src: "jZOywn1qArI" },
    { title: "The Social Network", src: "2BE2XhnZ_4g", alt: ["Social Network"] },
    { title: "Avengers: Infinity War", src: "EpI3x6gf2uA", alt: ["Infinity War", "Avengers Infinity War"] },
    { title: "Spider-man: Into the spider-verse", src: "oJyz1snRgOU", alt: ["spiderman Into the spiderverse", "Spiderman", "Into the spider verse", "Into the spiderverse"] },
    { title: "Avengers: Endgame", src: "tdMaz-x8BAI", alt: ["Endgame"] },
    { title: "X-Men: Days of future past", src: "T9GFyZ5LREQ", alt: ["xmen", "days of future past"] },
    { title: "Deadpool", src: "tLmStxxzhkI" },
    { title: "Tenet", src: "4xj0KRqzo-0" },
    { title: "The Dark Knight", src: "nyepdtx_UI4" },
    { title: "Inception", src: "TAbbJT0ZXmk" },
    { title: "The Avengers", src: "SLD9xzJ4oeU", alt: ["Avengers"] },
    { title: "Mission Impossible: Ghost Protocol", src: "qtA0JS1lBaY", alt: ["Mission Impossible", "Ghost Protocol"] },
    { title: "Mission Impossible: Fallout", src: "hhLIwmgx3vI", alt: ["Mission Impossible", "Fallout"] },
    { title: "Legend", src: "zZ7AWVKbPWY" },
    { title: "The Matrix", src: "zE7PKRjrid4" },
    { title: "Madagascar", src: "kPE7ZCGjw4o" },
    { title: "Bee Movie", src: "L46syxgju18" },
    { title: "How to train your dragon", src: "nPmIhH775L4" },
    { title: "Ghostbusters", src: "7_pR6mUYtOo" },
    { title: "Baywatch", src: "WDuIl_uPY_s" },
    { title: "Now you see me 2", src: "YmGBAiHnK0U", alt: ["Now you see me"] },
    { title: "Pirates of the Caribbean: The Curse of the Black Pearl", src: "8UseXb_DNhE", alt: ["Pirates of the Caribbean", "the curse of the black perl"] },
    { title: "Anchorman: The Legend of Ron Burgundy", src: "ipsPgNEmAXI", alt: ["Anchorman"] },
    { title: "Ace Ventura", src: "khyXMXFSufE" },
    { title: "Shrek 2", src: "A_HjMIjzyMU" },
    { title: "The Incredibles", src: "IRPI3lSACFc" },
    { title: "Despicable Me", src: "8R1OS5jPh2s" },
    { title: "Kung Fu Panda", src: "Jy2_J5WCzDY" },
    { title: "Ratatouille", src: "IojkKlmwnOE" },
    { title: "Guardians Of The Galaxy", src: "YVTXTPYsNDY", alt: ["Guardians"] },
    { title: "Whiplash", src: "xDAsABdkWSc" },
    { title: "The Lion King", src: "BAoCYwefq1A", alt: ["Lion King"] },
    { title: "Back to the future", src: "FWG3Dfss3Jc" },
    { title: "Django Unchained", src: "t1beG9Y6I9c", alt: ["Django"] },
    { title: "Hot Fuzz", src: "Cun-LZvOTdw" },
    { title: "Knives Out", src: "xNwQyNMSUmg" },
    {
        title: "Harry Potter and the Deathly Hallows: Part 1",
        src: "R2zNRrOXbPY",
        alt: [
            "Harry Potter",
            "Deathly Hallows",
            "The Deathly Hallows",
            "Deathly Hallows: Part 1",
            "The Deathly Hallows: Part 1",
            "Harry Potter and the Deathly Hallows",
            "Harry Potter and the Deathly Hallows Part 1",
            "Harry Potter and the Deathly Hallows: Part 2",
            "Harry Potter and the Deathly Hallows Part 2",
        ],
    },
    { title: "Inside Out", src: "ISaHt3ps1dM" },
    { title: "The Martian", src: "BH-UmA5Lt3g", alt: ["Martian"] },
    { title: "Sherlock Holmes: A Game of Shadows", src: "qy6Kh5dkTeo", alt: ["Sherlock Holmes"] },
    { title: "Sully", src: "fJ5ZLdJDBrg" },
    { title: "Forrest Gump", src: "gAw9Ps-jwzM" },
    { title: "Venom", src: "z5Knt1R8C4g" },
    { title: "Shark Tale", src: "TxV4VUWk1fA" },
    { title: "Coach Carter", src: "6p3GaCwvUoE" },
    { title: "Pitch Perfect", src: "hGdz2rMbTIM" },
    { title: "Kingsman: The Secret Service", src: "HDJEyqNw-9k", alt: ["Kingsman", "Kingsman the secret service"] },
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
    inputField.style.color = "rgb(74, 159, 255)";
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
    inputField.style.color = "white";
    inputField.style.textAlign = "left";
    inputField.disabled = false;
    inputField.value = "";
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
    if (score < 0.1) {
        inputField.style.color = "rgb(104, 255, 74)";
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
console.log("Movies:", movies.length);
changeSRC();
