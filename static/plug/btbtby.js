const $ = require('jquery')
var util = require('util')
var Code = require('./code')
var fs = require('fs')
var path = require('path')
// var serurl = 'http://basezhushou.cn/?c=api&m=btbtby';
var serurl = 'http://www.op.com/?c=api&m=btbtby';
var btbty = module.exports = function () {
  this.init()
  this.sleep()
}
var tasks = []
var running = false
btbty.prototype.insertTask = function (t) {

  tasks.push(t)
  if (!running) {
    this.start(tasks[0])
    running = true
  }
  return tasks.length
}

function nexttask () {
  if(tasks.length>0)tasks.shift()
  if (tasks.length > 0) { this.start(tasks[0]) } else {
    running = false
  }
}

btbty.prototype.giframe = function () {
  var iframe = []
  var self = this
  if (self.jishu.length > 0) {
    $.get(self.jishu[0], {}, function (e) {
      var ur = $(e).find('iframe').attr('src')
      self.jishu.shift()
      if (ur.indexOf('https://www.ixxplayer.com') != -1) {
        self.param['url'].push(ur.split('?')[1].split('=')[1])
        self.giframe()
      } else {
        self.goon()
        self.addURLcode(ur)
        self.wait(1000)
        self.addElecode({'label': 'video'}, function (e) {
          self.param['url'].push($(e).attr('src'))
          self.giframe()
        })
      }
      self.sleep()
    })
  } else {
    try{
      self.post()
    }catch (e) {
      nexttask()
      console.log(e)
    }
  }
}
btbty.prototype.post = function () {
  self = this
  var sp = {}
  sp['source'] = self.task['url']
  sp['player'] = self.task['pid']
  sp['cid'] = self.task['cid']
  sp['name'] = self.param['name']
  sp['img'] = self.param['img']
  sp['ator'] = self.param['ator']
  sp['url'] = self.param['url']

  try{
      $.ajax(serurl,{data:sp,dataType:'json',success:function (e) {
          if (e == 1) {
              self.task['param'] = self.param
              if (self.back)self.back.call(null, self.task)
          } else {
              console.log(e)
          }
          nexttask()
      },error:function (e) {
          self.task['param'] = self.param
          if (self.back)self.back.call(null, self.task)
          savelocal(sp)
          nexttask()
      }})
    // $.post(serurl, sp, function (e) {
    //   if (e == 1) {
    //     self.task['param'] = self.param
    //     if (self.back)self.back.call(null, self.task)
    //   } else {
    //     console.log(e)
    //   }
    //   nexttask()
    // },'json')
  }catch (e) {
    throw (e)
  }

}

function savelocal(t){
    var date = new Date()
    var time=date.getFullYear()+'-'+date.getMonth()+"-"+date.getDay();
    if(!fs.existsSync('./'+time)){
        fs.mkdirSync('./'+time)
    }
    var fn= path.join('./',time,time+'.txt')
    fs.writeFile(fn,JSON.stringify(t)+"\n",{ 'flag': 'a' },function () {
        
    })
}

btbty.prototype.start = function (task) {
  self = this
  self.back = task['back']
  self.task = task
  self.param = []
  self.param['url'] = []
  self.jishu = []

  $.get(task['url'], {}, function (e) {
    self.param['img'] = eval($(e).find('.pic').css('background-image'))
    var pps = $(e).find('.text p')
    if (pps.length > 0) {
      self.param['name'] = pps.get(0).textContent
      self.param['ator'] = pps.get(1).textContent.replace('主演：', '')
    }

    $(e).find('.playlist1 li').each(function (i, e) {
      self.jishu[i] = 'http://m.btbtdy.com' + $(e).find('a').attr('href')
    })
    if (self.jishu.length > 0) { self.giframe() } else {
      alert(task['url'] + '没有播放集数')
      nexttask()
    }
  })
}

function url (p) {
  return p
}

util.inherits(btbty, Code)
