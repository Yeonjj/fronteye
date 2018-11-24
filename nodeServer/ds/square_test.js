const assert = require('assert');

// Square class
// width, height => 속성 (square.width)
// square.calcArea() => width * height
// get => square.area => width * height

class Square {
  constructor(width, height){
    this.width = width;
    this.height = height;
    // this.calcResult = width * height;
    this.calcResult = this.calcArea();
  }

  get result() {
    return this.width * this.height
  }

  calcArea() {
    var result = this.width*this.height
    return(result)
  }
}

const square = new Square(10, 10);

sqare

assert.equal(square.width, 10)
assert.equal(square.height, 10)
assert.equal(square.calcArea(), 100)
assert.equal(square.calcResult, 100)

console.log("success")