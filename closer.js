// false일 경우에는 안나옴!
(
false && function(myVar) {
	alert(`This is my URL: ${myVar}`)
}(document.location.href)
)
