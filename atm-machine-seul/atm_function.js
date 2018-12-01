let pin_num = "1234"
var is_card = false

function input_card() {
	is_card = true;
}

function eject_card() {
	is_card = false;
}

function my_pin(pin) {
	if (is_card) {
		// 2. pin
		if (pin === pin_num) {
			return true;
		} else {
			alert("Your pin is not correct");
			return false;
		}
	} else {
		alert("Please input card");
		return false;
	}
}
