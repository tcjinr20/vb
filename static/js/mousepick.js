
(function (win) {
    var body = document.querySelector('body')
    var pick = true
    body.addEventListener('mousedown', function (e) {
        if (pick) {
            body.addEventListener('mousemove', mousemove)
        } else {
            body.removeEventListener('mousemove', mousemove)
            reset()
        }
        pick = !pick
        e.preventDefault()
        e.stopImmediatePropagation()
    })

    var oldstyle = ''
    var oldtarget = null
    var oldclick = ''
    var mask = document.createElement('div')
    mask.style.backgroundColor='red'
    mask.style=" background-color: red;width: 700px;height: 30px;z-index: 999999;position: relative;opacity: 0.1;"

    function mousemove (e) {
        if (e.target === oldtarget) return
        if (oldtarget) {
            if(mask.parentNode){
                mask.parentNode.removeChild(mask)
            }
            oldtarget.style.border = oldstyle
        }
        oldstyle = e.target.style.border;
        mask.style.width=e.target.offsetWidth+"px";
        mask.style.height=e.target.offsetHeight+"px";
        mask.style.top="-"+e.target.offsetHeight+"px";
        console.log(mask.style.top)
        if(mask.parentNode){
            mask.parentNode.removeChild(mask)
        }
        try{
            e.target.appendChild(mask)
        }catch(e){
            console.log(e)
        }

        e.target.style.border = '1px solid red'

        oldtarget = e.target
    }

    function reset () {
        if (oldtarget) {
            oldtarget.style.border = oldstyle
            oldtarget.setAttribute('click', oldclick)
            win.picktarget = oldtarget
            console.log(win.picktarget)
        }
    }
})(window)
