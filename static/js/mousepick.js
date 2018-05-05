// https://cdn.bootcss.com/layer/3.1.0/mobile/need/layer.css
// https://cdn.bootcss.com/layer/3.1.0/layer.js
// https://cdn.bootcss.com/jquery/3.3.1/jquery.js

function LayB () {
  var self = this
  self.addItem = function () {
    $('#laybitems').append(laybitem)
  }
  self.removeItem = function (tar) {
    $(tar.parentNode).empty()
  }

  self.tick = function (target) {
    var pp = $(target.parentNode.parentNode)
    var input = pp.find('input[name=input]')
    var attr = pp.find('input[name=attr]')
    var out = pp.find('input[name=out]')
    var va = $(ma.picktarget).find(input.val())
    var re = va.attr(attr.val())
    if (!re) {
      re = va.get(0)[attr.val()]
    }
    out.val(re)
  }
}

function LayC () {
  var self = this
  self.savedata = function () {
    layer.prompt(function(val, index){
      layer.close(index);
      if(!val){
        layer.msg('没有文件名，重新保存');
        return
      }
      var resu = []
      $('.dataitem').each(function (i, e) {
        var pp = $(e)
        var input = pp.find('input[name=input]')
        var attr = pp.find('input[name=attr]')

        var o = {child: input.val(), attr: attr.val()}
        o.id = getEleID(ma.picktarget)
        resu.push(o)
      })

      window.nodepick = {'name':val,'body':resu}
      console.log(nodepick)
    });

  }
  window.nodepick = [{id: '11', child: '99', attr: 'retr'}, {id: '11', child: '99', attr: 'retr'}]

  self.look = function () {
    if(!window.nodepick){
      layer.alert('空数据')
      return
    }
    table.render({
      elem: '#preview',
      height: 315,
      cols: [[ // 表头
        {field: 'id', title: 'ID', width: 80, fixed: 'left'},
        {field: 'child', title: 'child', width: 80},
        {field: 'attr', title: 'attr', width: 135}
      ]],
      data:window.nodepick
    })
  }

  function getEleID (t) {
    if (t.id) {
      return t.id
    } else {
      return t.nodeName + '.' + t.classList.toString().split(' ').join('.')
    }
  }

}

function MouseAction (back) {
  var self = this
  var body = document.querySelector('body')
  var oldstyle = ''
  var oldtarget = null
  self.callback = back
  self.bengin = function () {
    body.addEventListener('mousemove', mv, false)
    body.addEventListener('mousedown', md, false)
  }
  self.stop = function () {
    body.removeEventListener('mousemove', mv)
    body.removeEventListener('mousedown', md)
  }
  self.dispose = function () {
    self.stop()
    self.callback = null
    self.picktarget = null
  }
  self.updom = function () {
    if (oldtarget) {
      oldtarget = oldtarget.parentNode
    }
    self.picktarget = oldtarget
    self.callback.call(null, oldtarget)
  }
  self.downdom = function () {
    if (oldtarget) {
      oldtarget = oldtarget.firstChild
    }
    self.picktarget = oldtarget
    self.callback.call(null, oldtarget)
  }
  function md (e) {
    if (oldtarget)oldtarget.style.border = oldstyle
    self.picktarget = oldtarget
    self.callback.call(null, oldtarget)
    self.stop()
    e.preventDefault()
    e.stopImmediatePropagation()
    return false
  }
  function mv (e) {
    if (e.target === oldtarget) return
    if (oldtarget)oldtarget.style.border = oldstyle
    oldstyle = e.target.style.border
    e.target.style.border = '1px solid red'
    oldtarget = e.target
  }
}

var ma = new MouseAction(function (target) {
  ma.stop()
  $('#pickright').text(target.outerHTML)
  $('#pickleft').html(target.outerHTML)
})
var layb = new LayB()
var layc = new LayC()

var laybitem = '<div class="layui-inline dataitem"><div class="layui-input-inline"><input type="text" name="input" lay-verify="required" autocomplete="off" class="layui-input" oninput="layb.tick(this)"></div><div class="layui-input-inline"><input oninput="layb.tick(this) type="text" name="attr" value="innerHTML" lay-verify="required" autocomplete="off" class="layui-input"></div><div class="layui-input-inline"><input type="text" name="out" lay-verify="required" autocomplete="off" class="layui-input"></div><button class="layui-btn layui-btn-xs" onclick="layb.removeItem(this)"><i class="layui-icon">ဆ</i></button></div>'
var layhtmlA = '<button class="layui-btn" onclick="ma.bengin()">抓取</button>' +
  '<button class="layui-btn" onclick="ma.updom()"><i class="layui-icon"></i></button>' +
  '<div class="layui-row">\n' +
  '    <div class="layui-col-md6" id="pickleft">\n' +
  '    </div>\n' +
  '    <div class="layui-col-md6" id="pickright">\n' +
  '    </div>\n' +
  '  </div>'
var layhtmlB = '<button class="layui-btn" onclick="layb.addItem()"><i class="layui-icon"></i></button>' +
  '<div class="layui-row" id="laybitems">' + laybitem + '</div>'
var layhtmlC = '<button class="layui-btn" onclick="layc.savedata()">保存</button><button class="layui-btn" onclick="layc.look()">查看</button>' +
  '<div class="layui-row"><table id="preview"></table></div>'

function addScript (src, back) {
  var sr = document.createElement('script')
  sr.src = src
  sr.onload = back
  var body = document.querySelector('body')
  body.appendChild(sr)
}

function addCss (hh) {
  var lik = document.createElement('link')
  lik.rel = 'stylesheet'
  lik.type = 'text/css'
  lik.href = hh
  var head = document.querySelector('head')
  head.appendChild(lik)
}
var apppath = 'http://127.0.0.1:4544'
addCss(apppath + '/layui/css/layui.css')
addScript(apppath + '/layui/layui.js', function () {
  layui.use(['layer', 'table'], function () {
    window.layer = layui.layer
    window.table = layui.table
    layer.tab({
      maxmin: true,
      shade: 0,
      area: ['600px', '300px'],
      tab: [{
        title: 'A',
        content: layhtmlA
      }, {
        title: 'B',
        content: layhtmlB
      }, {
        title: 'C',
        content: layhtmlC
      }]
    })

  })
})
