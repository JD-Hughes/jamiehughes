const modes = ['year','month','week','day','hour','minute','second']
const places = [12,11,11,10,10,11,9]
let dob = '1999-05-14'
let ageEl = document.getElementById("age");
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