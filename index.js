const express = require("express")
const app = express();

const cors = require("cors");

const { exec } = require("child_process")


app.use(express.json())

app.use(cors())

app.post("/keyboard", (req, res) => {

	let { key, modifier } = req.body;

	modifier = modifier ? `${modifier}+` :"";


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


		"escape" : "Escape",
		"tab" : "Tab",
		"capslock" : "Escape",
		" " : "space",
		"backspace" : "BackSpace"
	}

	let type_map = [
		"=", 
		":",
		";",
		",",
		".",
		"-",
		"_",
		"?",
		"´",
		"`",
		"^",
		"°",
		"|",
		"<",
		">",
		"\\",
		"{",
		"[",
		"]",
		"}"
	] 


	if(key_map[key]){
		key = key_map[key]
	}
	if(type_map.includes(key)){
		exec(`xdotool type ${key}`)
		return
	}

	modifier = modifier.toLowerCase();

	let r = (`xdotool key ${modifier}${key}`);

	console.log(r)

	exec(r)

	res.send("")

})


app.post("/mouse", (req, res) => {

	let {movement, buttons} = req.body;

	let button = "mouseup 1 mouseup 2";
	if(buttons.left_click){
		button = "mousedown 1"
	}
	if(buttons.right_click){
		button = "mousedown 2"
	}

	exec(`xdotool ${button} mousemove_relative -- ${movement.dx} ${movement.dy}`)	


	res.send("")
})

app.post("/click", (req, res) => {

	let { left_click, right_click } = req.body;

	console.log(req.body);

	if(left_click){
		exec(`xdotool click 1`)	
	}		

	if(right_click){
		exec(`xdotool click 3`)	
	}		


	res.send("")

})

app.listen(8080);
