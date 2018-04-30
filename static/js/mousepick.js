
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
    mask.style=" background-color: red;width: 700px;height: 30px;z-index: 999999;top: -30px;position: relative;opacity: 0.1;"
    mask.innerText='1111111111'
    mask.style.width='100%'
    mask.style.height='100%'

  function mousemove (e) {
    if (e.target === oldtarget) return
    if (oldtarget) {

      oldtarget.setAttribute('onclick', oldclick)
      oldtarget.style.border = oldstyle
    }
    oldstyle = e.target.style.border;
    // oldclick = e.target.getAttribute('click')
    // e.target.setAttribute('onclick','function(e){alert(2);e.preventDefault;return false;}')
    mask.style.width=e.target.style.width;
    mask.style.height=e.target.style.height;
    e.target.insertBefore(mask)
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
