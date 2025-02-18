let locked = false;


//react on unlock
document.addEventListener("pointerlockchange", () => {
    if (document.pointerLockElement) {
	    console.log("lock")
    } else {
	console.log("unlock")	
	locked  =false;

    }
});


document.addEventListener("keydown", async e => {
	
	console.log(e.key, e.ctrlKey, e.shiftKey, e.altKey)

	if(e.ctrlKey && e.key == "s"){
	
		locked = true;

		document.body.requestPointerLock();
	}

	if(!locked){
		return 
	}

	let modifier = [];

	if(e.ctrlKey){
		modifier.push("ctrl")
	}
	if(e.altKey){
		modifier.push("alt")
	}
	if(e.shiftKey){
		modifier.push("shift")
	}

	let response = await fetch("https://neptunapp.org/keyboard", {
		method : "POST",
		headers : {
			"Content-Type" : "application/json",
		},
		body : JSON.stringify({
			modifier : modifier.join("+"),
			key : e.key	
		})
	}).then(res => res.json());
})

let left_click = false;
let right_click = false;

document.addEventListener("mousedown", async e => {
	console.log(e.which)
	if(e.which == 1){
		left_click = true;
	}

	if(e.which == 3){
		right_click = true;
	}
})


document.addEventListener("mouseup", async e => {

	if(e.which == 1){
		left_click = false;
	}

	if(e.which == 3){
		right_click = false;
	}
})

document.addEventListener("mousemove", async e => {

	if(!locked){
		return
	}	



	let response = await fetch("https://neptunapp.org/mouse", {
		method : "POST",
		headers : {
			"Content-Type" : "application/json",
		},
		body : JSON.stringify({
			movement : {
				dx : e.movementX,
				dy : e.movementY
			},
			buttons : {
				left_click, 
				right_click
			}
		})
	}).then(res => res.json());

})

document.addEventListener("click", async e => {	
	if(!locked){
		return
	}

	if(e.which == 1){
		left_click = true;
	}
	if(e.which == 3){
		right_click = true;
	}


	let response = await fetch("https://neptunapp.org/click", {
		method : "POST",
		headers : {
			"Content-Type" : "application/json",
		},
		body : JSON.stringify({
			movement : {
				dx : e.movementX,
				dy : e.movementY
			},
			buttons : {
				left_click, 
				right_click
			}
		})
	}).then(res => res.json());
})

document.addEventListener("wheel", async e => {

	if(!locked){
		return
	}

	let response = await fetch("https://neptunapp.org/scroll", {
		method : "POST",
		headers : {
			"Content-Type" : "application/json",
		},
		body : JSON.stringify({
			amount : e.deltaY
		})
	}).then(res => res.json());

})
