const express = require("express")
const app = express();

const cors = require("cors");

const { exec } = require("child_process")


app.use(cors())

app.post("/keyboard", (req, res) => {

	let { key, modifier } = req.body;

	modifier = modifier ? "${modifier}+" :"";


	key = key.toLowerCase();



	let key_map = {
		"!" : 1,
		'"' : 2,
		'§' : 3,
		'$' : 4,
		'%' : 5,
		'&' : 6,
		'/' : 7,
		'(' : 8,
		')' : 9,
		'=' : 0,

		'{' : 7,
		'[' : 8,
		']' : 9,
		'}' : 0,

		"escape" : "Escape",
		"tab" : "Tab",
		"capslock" : "Escape"
	}


	if(key_map[key]){
		key = key_map[key]
	}

	modifier = modifier.toLowerCase();

	exec(`xdotool key ${modifier}${key}`);

	res.send("")

})


app.post("/mouse", (req, res) => {

	let {movement, buttons} = req.body;

	let button = "mouseup 1";
	if(buttons.left_click){
		button = "mousedown 1"
	}

	exec(`xdotool ${button} mousemove_relative -- ${movement.dx} ${movement.dy}`)	


	res.send("")
})

app.post("/click", (req, res) => {

	let {click} = req.body;


	exec(`xdotool click 1`)	

	res.send("")

})

app.listen(8080);
