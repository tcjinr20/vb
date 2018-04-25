var util=require('util');
var Code = require('./code')
const fs = require('fs')
var $=null;
var Video = module.exports = function Video(jquery) {
    $=jquery
    this.init()
    this.addURLcode('http://m.btbtdy.com/')
    this.addElecode({'class':'list'},bb)
    // this.sleep()
}

function bb(dom){
    var filecon = 'img,name,actor,alink\n';
    $(dom).find('ul>li').each(function(i,e){
        var b = '';
        b = $(e).find('.pic').css('background-image')
        b+= ","+$(e).find('.name').text()
        b+= ","+$(e).find('.actor').text()
        b+= ","+$(e).find('.alink').attr('href')
        filecon+=b+'\n'
    })

    fs.writeFile('video.csv',filecon,function () {
    })
    this.end()
    this.goon()
}

util.inherits(Video,Code)


