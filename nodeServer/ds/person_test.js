// var Person = require('./person.js')
const assert = require('assert');

// Person
// 눈, 코 => 2,1
// 성, 이름을 set: new Person('first_name', 'last_name')
// 성, 이름을 console.log : "My name is 슬찬 킴"
class Person {
  constructor(first_name='seul', last_name='kim'){
    this.eyes = 2;
    this.nose = 1;
    this.first_name = first_name;
    this.last_name = last_name;
  }
  print_my_name() {
    return("My name is " + this.first_name + " " + this.last_name)
  }
}

// Student
// 사람
// this.job = 'student'
// student : grade
// print_iam_student() "I am a student."
class Student extends Person {
  constructor(first_name='seul', last_name='kim', grade=0){
    super(first_name, last_name)
    this.job = 'student';
    this.grade = grade
  }
  print_iam_student(){
    return('i am a student')
  }
}

const lee = new Student();

// Freeman
// this.job 
// last_job_date

// Working
// working_name


// function Person(first_name, last_name) {
//   this.eyes = 2;
//   this.nose = 1;
//   this.first_name = first_name;
//   this.last_name = last_name;
// }

const kim = new Person();

assert.equal(kim.__proto__, Person.prototype)
assert.equal(kim.eyes, 2)
assert.equal(kim.nose, 1)
assert.equal()

const yoon = new Person('soyun', 'yoon');

// yoon.first_name 이라는 결과값이 soyun이 나와야 한다
assert.equal(yoon.first_name,'soyun')
assert.equal(yoon.last_name,'yoon')

// yoon.print_my_name() 이라는 결과값이 "My name is soyun yoon"이 나와야 한다
assert.equal(yoon.print_my_name(), "My name is soyun yoon")

console.log("success")