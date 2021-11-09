const modes = ['year','month','week','day','hour','minute','second']
const places = [12,11,11,10,10,11,9]
let dob = '1999-05-14'
let ageEl = document.getElementById("age");
let surviveEl = document.getElementById("survived");
let modeButton = document.getElementById("mode")
let mode = 0

setInterval(() => {
	let time = dayjs().diff(dayjs(dob), modes[mode], true);
	ageEl.innerText = time.toString().substring(0, places[mode]);
}, 50);

function changeMode () {
    if (mode < modes.length - 1) mode += 1
    else mode = 0

    modeButton.innerText = modes[mode].toString() + 's'
}

setInterval(() => {
	let time = dayjs().diff(dayjs(dob), 'year', true);
    let yearsAlive = (time.toString().substring(0,12))
    let maths = (Math.pow(yearsAlive*0.00000004521093580786,4) + Math.pow(yearsAlive*0.00000462699183828769,3) + Math.pow(yearsAlive*0.00021686105977165100,2) + yearsAlive*0.00243991806250655000 + 0.00713552195321266000)*100;
    surviveEl.textContent = maths.toString().substring(0,10) + "%"
}, 500);