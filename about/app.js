const ageModes = ["year", "month", "week", "day", "hour", "minute", "second"];
const ageDecimalPlaces = [12, 11, 11, 10, 10, 11, 9];
let dob = "1999-05-14";
let ageEl = document.getElementById("age");
let surviveEl = document.getElementById("survived");
let modeButton = document.getElementById("mode");
let ageMode = 0;
let fitbitEl = document.getElementById("fitbit");

setInterval(() => {
    let time = dayjs().diff(dayjs(dob), ageModes[ageMode], true);
    ageEl.innerText = time.toString().substring(0, ageDecimalPlaces[ageMode]);
}, 50);

function changeAgeMode() {
    if (ageMode < ageModes.length - 1) ageMode += 1;
    else ageMode = 0;

    modeButton.innerText = ageModes[ageMode].toString() + "s";
}

function loadFitbitData() {
    console.log("Fetching data from Fitbit...");
    fetch("https://api.fitbit.com/1/user/-/activities.json", {
        headers: {
            accept: "application/json",
            authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzdZVDgiLCJzdWIiOiI3QlRKMlAiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyYWN0IiwiZXhwIjoxNjQyOTI0NDIwLCJpYXQiOjE2NDI4OTU2MjB9.JfAQ62fnDAjEOiCxUM4UA0za2EM6Hf_1C-fC-S2oQ4E",
        },
    })
        .then((response) => response.json())
        .then(
            (data) => (fitbitEl.innerText = data["lifetime"]["total"]["steps"])
        );
}

setInterval(() => {
    let time = dayjs().diff(dayjs(dob), "year", true);
    let yearsAlive = time.toString().substring(0, 12);
    let maths =
        (Math.pow(yearsAlive * 0.00000004521093580786, 4) +
            Math.pow(yearsAlive * 0.00000462699183828769, 3) +
            Math.pow(yearsAlive * 0.000216861059771651, 2) +
            yearsAlive * 0.00243991806250655 +
            0.00713552195321266) *
        100;
    surviveEl.textContent = maths.toString().substring(0, 10) + "%";
}, 500);

// DATASET - https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/datasets/deathsregisteredinenglandandwalesseriesdrreferencetables
loadFitbitData();
