let textEl = document.getElementById("question");
let buttonEl = document.getElementById("next-button");
let elem = document.documentElement;
let questions = [
    "Name, Age, Location",
    "What is the most recent major news story?",
    "Open your phone and list of the last 5 people you texted",
    "If you had to choose one person who has had the biggest impact on you in the past year who would it be?",
    "You get to tell your past self one piece of advice that would have helped you this year. What do you say?",
    "What is your favorite memory from this past year?",
    "What was your least favorite moment from the last year?",
    "What do you hope to acomplish over the next year?",
    "What cities/states/countries did you visit?",
    "What was your biggest achievement of the year?",
    "What song will always remind you of this year? (Most played song)",
    "Have you become happier or sadder over the past year?",
    "What are you looking forward to this year?",
    "What do you think will happen this year?",
    "What was the nicest thing someone did for you this year?",
];

function rotateText() {
    if (textEl.classList.contains("rotate")) textEl.classList.remove("rotate");
    else textEl.classList.add("rotate");
}

function toggleButton() {
    if (buttonEl.classList.contains("fade-out")) {
        buttonEl.classList.remove("fade-out");
        buttonEl.disabled = false;
    } else {
        buttonEl.classList.add("fade-out");
        buttonEl.disabled = true;
    }
}

function newPrompt() {
    let randomPrompt = Math.floor(Math.random() * questions.length);
    rotateText();
    toggleButton();
    setTimeout(() => {
        if (questions[randomPrompt]) {
            textEl.innerText = questions[randomPrompt];
            questions.splice(randomPrompt, 1);
            rotateText();
            toggleButton();
        } else {
            textEl.innerText = "No more questions :(";
            rotateText();
        }
    }, 600);
}
