var body = document.querySelector('body')
body.addEventListener("mousedown",function (e) {
    body.addEventListener('mousemove',mousemove)
})
body.addEventListener("mouseup",function () {
    body.removeEventListener('mousemove',mousemove)
})
function mousemove(){

}
