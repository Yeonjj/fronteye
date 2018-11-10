## let, const 공통점 / 차이점

- es2015에 `let`, `const`가 추가됨

- 기존 자바스크립트의 `var`의 문제점

```javascript
// var 문제점
// 재선언
var a = 'test'
var a = 'test2'

// hoisting
c = 'test'
var c
```

이런 문제점 때문에 생간 `let`, `const`는 모두 재선언이 불가능하다.

이게 가능한 이유는 `scope`의 차이

- 기본적으로 `var`로 선언한 변수는 `Function-level scope`를 가짐. 그래서 전역으로 선언하면 전역 변수로 선언이 된다.
- 하지만 `let`은 `Block-level scope`이기 때문에 전역에 선언하더라도 보이지 않는 특정 블록 내에만 존재

```javascript
var varValue = 1;
console.log(window.varValue); //1

let letValue = 1;
console.log(window.letValue); // undefined

{
    var varValue = 1;
    let letValue = 1;
}

console.log(varValue);
console.log(letValue);  //Uncaught ReferenceError: letValue is not defined
```

그렇다면 둘 사이의 차이점은? `immutable` 여부

- `let`은 변수에 재할당이 가능
- `const`는 변수 재선언, 재할당이 모두 불가능

```javascript
// let
let a = 'test'
let a = 'test2' // Uncaught SyntaxError: Identifier 'a' has already been declared
a = 'test3' // 가능

// const
const b = 'test'
const b = 'test2' // Uncaught SyntaxError: Identifier 'a' has already been declared
b = 'test3' // Uncaught TypeError:Assignment to constant variable.
```

즉, 기본형 변수를 선언할때 값의 변경이 필요할 경우에는 `let`, 

**값의 변화가 필요없는 상수로 사용될 경우** `const`로 선언

