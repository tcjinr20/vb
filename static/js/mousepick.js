
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
  function mousemove (e) {
    if (e.target === oldtarget) return
    if (oldtarget) {

      oldtarget.setAttribute('click', oldclick)
      oldtarget.style.border = oldstyle
    }
    oldstyle = e.target.style.border
    oldclick = e.target.getAttribute('click')
    e.target.setAttribute('click','function(e){alert(2);e.preventDefault;return false;}')
    e.target.style.border = '1px solid red'

    oldtarget = e.target
  }

  function reset () {
    if (oldtarget) {
      oldtarget.style.border = oldstyle
      oldtarget.setAttribute('click', oldclick)
      win.picktarget = oldtarget
    }
  }
})(window)
