class atmState {
	insertCard() {
		return
	}
	ejectCard() {
		return
	}
	insertPin(pin) {
		return
	}
	requestCash(cash) {
		return
	}
}


class hasCard extends atmState {
	insertCard() {
		alert('Card is already in')
		return
	}
	ejectCard() {
		return
	}
	insertPin(pin) {
		if (pin === my_pin) {
			return
		} else {
			alert('Your pin number is wrong');
			// insertPin(pin)
		}
	}
	requestCash(cash) {
		alert('You have to input your pin first');
		return
	}
}

class noCard extends atmState {
	insertCard() {
		return
	}
	ejectCard() {
		alert('You have no card yet');
		return
	}
	insertPin(pin) {
		alert('You have no card yet');
		return
	}
	requestCash(cash) {
		alert('You have no card yet');
		return
	}
}


class hasPin extends atmState {
	insertCard() {
		alert('You already have card');
		return
	}
	ejectCard() {
		return
	}
	insertPin(pin) {
		alert('You already entered pin');
		return
	}
	requestCash(cash) {
		return
	}
}


class noCash extends atmState {
	insertCard() {
		alert('There is no cash in machine');
		return
	}
	ejectCard() {
		alert('There is no cash in machine');
		return
	}
	insertPin(pin) {
		alert('There is no cash in machine');
		return
	}
	requestCash(cash) {
		alert('You already entered pin');
		return
	}
}
