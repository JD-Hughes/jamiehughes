const data = {
    dob: "1999-05-14",
    countries: ["England", "Scotland", "Wales", "Ireland", "France", "Spain", "Italy", "Germany", "Greece", "Mexico", "USA", "Turkey", "Australia", "Belgium"],
    states: [
        "New York",
        "North Carolina",
        "South Carolina",
        "New Jersey",
        "Florida",
        "Hawaii",
        "Vermont",
        "California",
        "Nevada",
        "Washington",
        "Washington D.C",
        "Connecticut",
        "Arizona",
        "Massachusetts",
    ],
    jobs: [
        "Waterski Instructor",
        "Forklift Driver",
        "Waterfront Manager",
        "Race Marshall",
        "Maintenance/Operations Crew Member",
        "Bank Intern",
        "Receptionist",
        "Activities Manager",
        "Aerospace Technical Apprentice",
    ],
    fitbit: { steps: 1, floors: 1, distance: 1 },
    height: {
        metric: 178,
        imperial: "5ft 10",
        random: [
            { name: "toothpicks", length: 6.3 },
            { name: "bananas", length: 13 },
            { name: "Boeing 747's", length: 7630 },
            { name: "stacked quaters", length: 0.175 },
            { name: "pencils", length: 19 },
            { name: "football fields", length: 9144 },
            { name: "stacked playing cards", length: 0.024 },
        ],
    },
};
const ageModes = ["year", "month", "week", "day", "hour", "minute", "second"];
const ageDecimalPlaces = [12, 11, 11, 10, 10, 11, 9];
let dob = "1999-05-14";
let ageEl = document.getElementById("age");
let surviveEl = document.getElementById("survived");
let currentMode = { age: 0, height: 0 };

setInterval(() => {
    let time = dayjs().diff(dayjs(dob), ageModes[currentMode["age"]], true);
    ageEl.innerText = time.toString().substring(0, ageDecimalPlaces[currentMode["age"]]);
}, 50);

function changeAgeMode() {
    let modeButton = document.getElementById("mode-age");
    if (currentMode["age"] < ageModes.length - 1) currentMode["age"] += 1;
    else currentMode["age"] = 0;

    modeButton.innerText = ageModes[currentMode["age"]].toString() + "s";
}

function changeHeightMode() {
    let modeButton = document.getElementById("mode-height");
    let heightEl = document.getElementById("height");
    if (currentMode["height"] < data["height"]["random"].length + 1) currentMode["height"]++;
    else currentMode["height"] = 0;
    if (currentMode["height"] == 0) {
        modeButton.innerText = "centimeters";
        heightEl.innerText = data["height"]["metric"];
    } else if (currentMode["height"] == 1) {
        modeButton.innerText = "inches";
        heightEl.innerText = data["height"]["imperial"];
    } else {
        let randomData = data["height"]["random"][currentMode["height"] - 2];
        modeButton.innerText = randomData.name;
        heightEl.innerText = (data["height"]["metric"] / randomData.length).toFixed(4);
    }
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
