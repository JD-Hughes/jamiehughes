// global variables
const confetti = document.getElementById("confetti");
const confettiCtx = confetti.getContext("2d");
const nameContainer = document.getElementById("nameContainer");
let container,
    confettiElements = [],
    clickPosition;

// helper
rand = (min, max) => Math.random() * (max - min) + min;

// params to play with
const confettiParams = {
    // number of confetti per "explosion"
    number: 50,
    // min and max size for each rectangle
    size: { x: [5, 20], y: [10, 18] },
    // power of explosion
    initSpeed: 25,
    // defines how fast particles go down after blast-off
    gravity: 0.45,
    // how wide is explosion
    drag: 0.08,
    // how slow particles are falling
    terminalVelocity: 4,
    // how fast particles are rotating around themselves
    flipSpeed: 0.017,
};
const colors = [
    { front: "#3B870A", back: "#235106" },
    { front: "#B96300", back: "#6f3b00" },
    { front: "#E23D34", back: "#88251f" },
    { front: "#CD3168", back: "#7b1d3e" },
    { front: "#664E8B", back: "#3d2f53" },
    { front: "#394F78", back: "#222f48" },
    { front: "#008A8A", back: "#005353" },
];

setupCanvas();
updateConfetti();

window.addEventListener("resize", () => {
    setupCanvas();
    hideConfetti();
});

// Confetti constructor
function Conf() {
    this.randomModifier = rand(-1, 1);
    this.colorPair = colors[Math.floor(rand(0, colors.length))];
    this.dimensions = {
        x: rand(confettiParams.size.x[0], confettiParams.size.x[1]),
        y: rand(confettiParams.size.y[0], confettiParams.size.y[1]),
    };
    this.position = {
        x: clickPosition[0],
        y: clickPosition[1],
    };
    this.rotation = rand(0, 2 * Math.PI);
    this.scale = { x: 1, y: 1 };
    this.velocity = {
        x: rand(-confettiParams.initSpeed, confettiParams.initSpeed) * 0.4,
        y: rand(-confettiParams.initSpeed, confettiParams.initSpeed),
    };
    this.flipSpeed = rand(0.2, 1.5) * confettiParams.flipSpeed;

    if (this.position.y <= container.h) {
        this.velocity.y = -Math.abs(this.velocity.y);
    }

    this.terminalVelocity = rand(1, 1.5) * confettiParams.terminalVelocity;

    this.update = function () {
        this.velocity.x *= 0.98;
        this.position.x += this.velocity.x;

        this.velocity.y += this.randomModifier * confettiParams.drag;
        this.velocity.y += confettiParams.gravity;
        this.velocity.y = Math.min(this.velocity.y, this.terminalVelocity);
        this.position.y += this.velocity.y;

        this.scale.y = Math.cos((this.position.y + this.randomModifier) * this.flipSpeed);
        this.color = this.scale.y > 0 ? this.colorPair.front : this.colorPair.back;
    };
}

function updateConfetti() {
    confettiCtx.clearRect(0, 0, container.w, container.h);

    confettiElements.forEach((c) => {
        c.update();
        confettiCtx.translate(c.position.x, c.position.y);
        confettiCtx.rotate(c.rotation);
        const width = c.dimensions.x * c.scale.x;
        const height = c.dimensions.y * c.scale.y;
        confettiCtx.fillStyle = c.color;
        confettiCtx.fillRect(-0.5 * width, -0.5 * height, width, height);
        confettiCtx.setTransform(1, 0, 0, 1, 0, 0);
    });

    confettiElements.forEach((c, idx) => {
        if (c.position.y > container.h || c.position.x < -0.5 * container.x || c.position.x > 1.5 * container.x) {
            confettiElements.splice(idx, 1);
        }
    });
    window.requestAnimationFrame(updateConfetti);
}

function setupCanvas() {
    container = {
        w: confetti.clientWidth,
        h: confetti.clientHeight,
    };
    confetti.width = container.w;
    confetti.height = container.h;
}

function addConfetti(e) {
    const canvasBox = confetti.getBoundingClientRect();
    if (e) {
        clickPosition = [e.clientX - canvasBox.left, e.clientY - canvasBox.top];
    } else {
        clickPosition = [canvasBox.width * Math.random(), canvasBox.height * Math.random()];
    }
    for (let i = 0; i < confettiParams.number; i++) {
        confettiElements.push(new Conf());
    }
}

function hideConfetti() {
    confettiElements = [];
    window.cancelAnimationFrame(updateConfetti);
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

confettiLoop();
function confettiLoop() {
    if (document.hasFocus()) {
        addConfetti();
    }
    setTimeout(confettiLoop, 700 + Math.random() * 1700);
}

function updateLoop() {
    fetch("data.json")
        .then((response) => response.json())
        .then((data) => setBirthdays(data));
    setTimeout(updateLoop, 30000); // Updates every 30 seconds
}

function setBirthdays(data) {
    var whosBirthday = []; //Init the array
    var dateToday = new Date(); //Get todays date
    nameContainer.innerHTML = `<h1 class="title">Happy Birthday</h1>`; //Reset the page
    for (let i = 0; i < data.length; i++) {
        //Itterate through the data
        const element = data[i];
        const birthday = new Date(element["date"]); //Convert the birthdate into date format
        if (birthday.getDate() === dateToday.getDate() && birthday.getMonth() === dateToday.getMonth()) {
            //Compare the day and month to see if they both match
            whosBirthday.push(element["name"]); //Push to the array
        }
    }

    for (let i = 0; i < whosBirthday.length; i++) {
        //Itterate through the list of names in the birthday list
        const element = whosBirthday[i];
        const birthdayName = document.createElement("h1");
        birthdayName.className = "name";
        birthdayName.innerText = element + "!"; //Append an ! to all of them
        nameContainer.appendChild(birthdayName);
    }
    if (whosBirthday.length == 0) {
        const birthdayName = document.createElement("h1");
        birthdayName.className = "name";
        birthdayName.innerText = "NOBODY!"; //Display the word "NOBODY!" instead of a name
        const upNextEl = document.createElement("h2");
        upNextEl.className = "up-next";
        upNextEl.innerText = upNext(data); //Show when the next birthday will be
        nameContainer.appendChild(birthdayName);
        nameContainer.appendChild(upNextEl);
    }

    console.log(whosBirthday); //Output the array
}

function daysTill(day, month) {
    var one_day = 1000 * 60 * 60 * 24;
    var currentDate = new Date();
    var inputDate = new Date(currentDate.getFullYear(), month, day);

    // To Calculate the result in milliseconds and then converting into days
    var Result = Math.round((inputDate.getTime() - currentDate.getTime()) / one_day);

    if (Result <= 0) {
        inputDate = new Date(currentDate.getFullYear() + 1, month, day);
        Result = Math.round((inputDate.getTime() - currentDate.getTime()) / one_day + 1);
    }

    // To remove the decimals from the (Result) resulting days value
    var Final_Result = Result.toFixed(0);
    return Final_Result;
}

function upNext(data) {
    var minDays = 999;
    for (let i = 0; i < data.length; i++) {
        const element = new Date(data[i]["date"]);
        var daysUntilBirthday = daysTill(element.getDate(), element.getMonth());
        minDays = Math.min(daysUntilBirthday, minDays);
    }
    if (minDays == 1) {
        return `Next birthday in ${minDays} Day!`;
    } else {
        return `Next birthday in ${minDays} Days!`;
    }
}

updateLoop();
