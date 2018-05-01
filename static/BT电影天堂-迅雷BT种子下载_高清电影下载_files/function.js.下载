var ajax = new AJAX();ajax.setcharset("utf-8");
function reportErr(id){openWin("/"+sitePath+"err.php?id="+id,400,220,350,250,0)}

function AddFav(vid,uid)
{
	ajax.get( 
		"/"+sitePath+"include/ajax.php?action=addfav&id="+vid+"&uid="+uid,
		function(obj) {
			if (obj.responseText=="err"){
				alert("请先登录!");
				location.href="/"+sitePath+"login.php";
			}else{
				alert("收藏成功!");
			}
		}
	);
}

function viewComment(id,page){
	var url;
	if (page.length==0){url=id;}else{url="/"+sitePath+"comment.php?id="+id+"&page="+page;}
	ajax.get( 
		url,
		function(obj) {
			if (obj.responseText=="err"){
				set(document.getElementById("comment_list"),"<font color='red'>发生错误</font>")	
			}else{
				set(document.getElementById("comment_list"),obj.responseText)	
			}
		}
	);		
}

function submitComment(id){
	if(document.getElementById("username").value.length<1){alert('请填写昵称');return false;}
	if(document.getElementById("msg").value.length<1){alert('请填写内容');return false;}
	ajax.postf(
		document.getElementById("f_comment"),
		function(obj){if(obj.responseText=="ok"){viewComment(id,1);alert('小弟我感谢您的评论!');}else if(obj.responseText=="validateerr"){alert('验证码错误，请点击验证码图片更新验证码！');}else if(obj.responseText=="havecomment"){alert('小样儿你手也太快了，歇会儿再来评论吧！');}else if(obj.responseText=="ipcomment"){alert('您所在的ip不能评论');}else if(obj.responseText=="wordcomment"){alert('您的评论中有禁用词语，不能评论');}/*else{alert(obj.responseText);}*/}
	);
}

function diggVideo(id,div){
	ajax.get(
		"/"+sitePath+"include/ajax.php?id="+id+"&action=digg",
		function (obj){
			var returnValue=Number(obj.responseText)
			if (!isNaN(returnValue)){set(document.getElementById(div),returnValue);alert('(*^__^*) 嘻嘻……，顶得我真舒服！');}else if(obj.responseText=="err"){alert('顶失败')}else if(obj.responseText=="havescore"){alert('(*^__^*) 嘻嘻…… 这么热心啊，您已经顶过了！')}	
		}
	);	
}

function treadVideo(id,div){
	ajax.get(
		"/"+sitePath+"include/ajax.php?id="+id+"&action=tread",
		function (obj){
			var returnValue=Number(obj.responseText)
			if(!isNaN(returnValue)){set(document.getElementById(div),returnValue);alert('小样儿，居然敢踩我！');}else if(obj.responseText=="err"){alert('踩失败')}	else if(obj.responseText=="havescore"){alert('我晕，您已经踩过了，想踩死我啊！')}	
		}
	);	
}

function diggNews(id,div){
	ajax.get("/"+sitePath+"include/ajax.php?id="+id+"&action=diggnews",function (obj){
			var returnValue=Number(obj.responseText)
			if (!isNaN(returnValue)){set(document.getElementById(div),returnValue);alert('(*^__^*) 嘻嘻……，顶得我真舒服！');}else if(obj.responseText=="err"){alert('顶失败')}else if(obj.responseText=="havescore"){alert('(*^__^*) 嘻嘻…… 这么热心啊，您已经顶过了！')}	
		}
	);
}

function treadNews(id,div){
	ajax.get("/"+sitePath+"include/ajax.php?id="+id+"&action=treadnews",function (obj){
			var returnValue=Number(obj.responseText)
			if(!isNaN(returnValue)){set(document.getElementById(div),returnValue);alert('小样儿，居然敢踩我！');}else if(obj.responseText=="err"){alert('踩失败')}	else if(obj.responseText=="havescore"){alert('我晕，您已经踩过了，想踩死我啊！')}	
		}
	);	
}

function alertFrontWin(zindex,width,height,alpha,str){
	openWindow(zindex,width,height,alpha)
	set(document.getElementById("msgbody"),str)
}

function getAspParas(suffix){
	var cur_url=location.href;
	var urlParas=location.search;
	if (cur_url.indexOf("?")>0){
		
		if(cur_url.indexOf("-")>0){
			return urlParas.substring(1,urlParas.indexOf(suffix)).split('-');
		}
		else
		{
			var tmpurl = cur_url.split("?");
			var mytemp = tmpurl[1]; 
			var superx = mytemp.split("&");
			var myarr = new Array(superx[0],superx[1],superx[2]);		
			return myarr;	
		}
	}else{
		return cur_url.substring(cur_url.lastIndexOf("/")+1,cur_url.indexOf(suffix)).split('-')	//伪静态
	}
}

function getHtmlParas(suffix){
		var cur_url=location.href;
		return cur_url.substring(cur_url.lastIndexOf("/")+1,cur_url.indexOf(suffix)).split('-')	//静态

		//var urlParas=location.href;
		//var tempurl = urlParas.replace("http://",""); //去掉 http
		//tempurl = tempurl.replace("//","/"); //避免出现双杠现象
		//var temparr = tempurl.split('/'); //通过 / 划分数组
		//var hosturl = "http://" + temparr[0]; // 主域名
		//var filename = temparr[temparr.length-1]; //文件名
		//var middle = "";
		//var filearr = filename.split('-');
		//middle = urlParas.replace(filename,"")+filearr[0];
		//var myarr = new Array(middle,filearr[1],filename.split('.')[0].split('-')[2]);
		//return myarr;
}

function handleParas(para1,para2){
	var i,fromArray,len1,len2,urlArray,j,dataStr,dataArray
	if (isNaN(para1) || isNaN(para2)){return false}
	fromArray=VideoInfoList.split('$$$')
	len1=fromArray.length;if(para2>len1-1){para2=len1-1}
	for (i=0;i<len1;i++){if (para2==i){urlArray=fromArray[i].split('$$')[1].split('#');len2=urlArray.length;if(para1>len2-1){para1=len2-1};for (j=0;j<len2;j++){if (para1==j){dataStr=urlArray[j];dataArray=dataStr.split('$');return dataArray}}}}
}


function regexpSplice(url,pattern,spanstr) {
   pattern.exec(url);
   return (RegExp.$1+spanstr+ RegExp.$2);
}

function getPageValue(pageGoName){
	var pageGoArray,i,len,pageValue
	pageGoArray=getElementsByName('input',pageGoName) ; len=pageGoArray.length
	for(i=0;i<len;i++){
		pageValue=pageGoArray[i].value;
		if(pageValue.length>0){return pageValue;}
	}
	return ""
}

function getPageGoUrl(maxPage,pageDiv,type,listpagename){
	var str,goUrl
	var url=location.href
	pageNum=getPageValue(pageDiv)
	if (pageNum.length==0||isNaN(pageNum)){alert('输入页码非法');return false;}
	if(pageNum>maxPage){pageNum=maxPage;}
	if(pageNum<1){pageNum=1;}
	switch (type){
		case 1 :
			//dynamic
			//http://127.0.0.1/xxxx/?1.html ; http://127.0.0.1/xxxx/?1-2.html
			str=(pageNum==1)?'':"-"+pageNum;
			goUrl=regexpSplice(url,/(http:\/\/\S+\?\d+)[-]{0,1}\d*(\.html|\.htm|\.shtml|\.shtm|\.asp)/,str);
			break;
		case 2 :
			//dir1
			//http://127.0.0.1/xxxx/xxxx.html ; http://127.0.0.1/xxxx/xxxx2.html
			if(url.lastIndexOf("/")==(url.length-1)){url+=listpagename}
			str=(pageNum==1)?'':pageNum;;
			goUrl=regexpSplice(url,/(http:\/\/\S+?)[\d]*(\.html|\.htm|\.shtml|\.shtm|\.asp|\.php)/,str);
			break;
		case 3 :
			//dir2
			//http://127.0.0.1/xxxx/1.html ; http://127.0.0.1/xxxx/1_2.html
			str=(pageNum==1)?'':"_"+pageNum;
			goUrl=(url.split('_').length<3)?regexpSplice(url,/(http:\/\/\S+\d+?)(\.html|\.htm|\.shtml|\.shtm|\.asp|\.php)/,str):regexpSplice(url,/(http:\/\/\S+\d+?)_\d+(\.html|\.htm|\.shtml|\.shtm|\.asp)/,str);
			if(goUrl.indexOf('http://')==-1){goUrl=regexpSplice(url,/(http:\/\/\S+_\d+?)(\.html|\.htm|\.shtml|\.shtm|\.asp|\.php)/,str);}
			break;
		case 5 :
			//zt
			//http://127.0.0.1/topiclist/?5.html ; http://127.0.0.1/topiclist/?5-2.html
			//http://127.0.0.1/topiclist/xxx.html ; http://127.0.0.1/topiclist/xxx-2.html
			str=(pageNum==1)?'':"-"+pageNum;
			goUrl=(url.split('-').length<2)?regexpSplice(url,/(http:\/\/\S+\d+?)(\.html|\.htm|\.shtml|\.shtm|\.asp|\.php)/,str):regexpSplice(url,/(http:\/\/\S+\d+?)-\d+(\.html|\.htm|\.shtml|\.shtm|\.asp)/,str);
			if(goUrl.indexOf('http://')==-1){goUrl=regexpSplice(url,/(http:\/\/\S+\d+?)(\.html|\.htm|\.shtml|\.shtm|\.asp|\.php)/,str);}
			break;
		case 6 :
			//forged
			str=(pageNum==1)?'':"-"+pageNum;
			goUrl=regexpSplice(url,/(http:\/\/\S+?)[-]{0,1}[\d]{0,1}(\.html|\.htm|\.shtml|\.shtm|\.asp|\.php)/,str);
			break;
		case 7:
			//ztindex
			//http://127.0.0.1/topic/?1.html
			str=pageNum;
			goUrl=regexpSplice(url,/(http:\/\/\S+\?+?)\d+(\.html|\.htm|\.shtml|\.shtm|\.asp|\.php)/,str);
			break;
			}
	location.href=goUrl;
}

function goSearchPage(maxPage,pageDiv,searchtype,searchword){
	var pageNum=getPageValue(pageDiv)
	if (pageNum.length==0||isNaN(pageNum)){alert('输入页码非法');return false;}
	if(pageNum>maxPage){pageNum=maxPage;}
	if(pageNum<1){pageNum=1;}
	location.href='?page='+pageNum+'&searchword='+searchword+'&searchtype='+searchtype;
}

function goCascadePage(maxPage,pageDiv,searchwhere){
	var pageNum=getPageValue(pageDiv)
	if (pageNum.length==0||isNaN(pageNum)){alert('输入页码非法');return false;}
	if(pageNum>maxPage){pageNum=maxPage;}
	if(pageNum<1){pageNum=1;}
	location.href='?page='+pageNum+'&'+searchwhere;
}

function leaveWord(){
	if(document.getElementById("m_author").value.length<1){alert('昵称必须填写');return false;}
	if(document.getElementById("m_content").value.length<1){alert('内容必须填写');return false;}
	ajax.postf(
		document.getElementById("f_leaveword"),
		function(obj){if(obj.responseText=="ok"){viewLeaveWordList(1);alert('留言成功，多谢支持！');document.getElementById("m_content").value='';}else if(obj.responseText=="haveleave"){alert('小样儿你手也太快了，歇会儿再来留言吧！');}else{alert('发生错误');}}
	);
}

function getVideoHit(vid){
	ajax.get(
		"/"+sitePath+"include/ajax.php?action=hit&id="+vid,
		function (obj){
			var result=obj.responseText
			if(result=="err"){set(document.getElementById('hit'),'发生错误')}else{set(document.getElementById('hit'),result);}
		}
	);				
}

function member()
{
	ajax.get( 
		"/"+sitePath+"include/ajax.php?action=member",
		function (obj){
			var result=obj.responseText;
			set(document.getElementById('seacms_member'),result);
		}
	);
}

function getNewsHit(nid){
	ajax.get(
		"/"+sitePath+"include/ajax.php?action=hitnews&id="+nid,
		function (obj){
			var result=obj.responseText
			
			if(result=="err"){set(document.getElementById('hit'),'发生错误')}else{set(document.getElementById('hit'),result);}
		}
	);		
}

function getVideodown(vid)
{
	ajax.get( 
		"/"+sitePath+"vidlist/"+vid+".html",
		function (obj){
			var result=obj.responseText;
			set(document.getElementById('nucms_downlist'),result);
		}
	);
}

function getVideodown2(vid,did,did2)
{
	ajax.get( 
		"/"+sitePath+"downlist/"+vid+"-"+did+"-"+did2+".html",
		function (obj){
			var result=obj.responseText;
			set(document.getElementById('video-down'),result);
		}
	);
}
//markVideo

function markVideo(vd,d,t,s,l){
	var textStart = Array("很烂 浪费时间","很烂 浪费时间","平庸 不看也罢","平庸 不看也罢","平庸 不看也罢","一般 不妨一看","很好 公认佳作","很好 公认佳作","完美 不容错过","完美 不容错过");
	var id='BT'+(new Date()).getTime();
	document.write('<div class="pfen"><div class="starscore"><input type="hidden"id="MARK_B1"name="MARK_B1"value="0"/><input type="hidden"id="MARK_B2"name="MARK_B2"value="0"/><input type="hidden"id="MARK_B3"name="MARK_B3"value="0"/><input type="hidden"id="MARK_B4"name="MARK_B4"value="0"/><div class="starA fl"id="filmStar"><span class="starB s0"id="start"></span><div class="starC"id="starTC"><a href="javascript:;"onClick="OnStar('+vd+',1)"onMouseOut="kaifach()"onMouseMove="startm(1)"></a><a href="javascript:;"onClick="OnStar('+vd+',2)"onMouseOut="kaifach()"onMouseMove="startm(2)"></a><a href="javascript:;"onClick="OnStar('+vd+',3)"onMouseOut="kaifach()"onMouseMove="startm(3)"></a><a href="javascript:;"onClick="OnStar('+vd+',4)"onMouseOut="kaifach()"onMouseMove="startm(4)"></a><a href="javascript:;"onClick="OnStar('+vd+',5)"onMouseOut="kaifach()"onMouseMove="startm(5)"></a><a href="javascript:;"onClick="OnStar('+vd+',6)"onMouseOut="kaifach()"onMouseMove="startm(6)"></a><a href="javascript:;"onClick="OnStar('+vd+',7)"onMouseOut="kaifach()"onMouseMove="startm(7)"></a><a href="javascript:;"onClick="OnStar('+vd+',8)"onMouseOut="kaifach()"onMouseMove="startm(8)"></a><a href="javascript:;"onClick="OnStar('+vd+',9)"onMouseOut="kaifach()"onMouseMove="startm(9)"></a><a href="javascript:;"onClick="OnStar('+vd+',10)"onMouseOut="kaifach()"onMouseMove="startm(10)"></a></div></div><span class="no c1"id="filmStarScore">0<i>.0</i></span></div><span class="fen"id="filmStarScoreTip"></span></div>');
	ajax.get("/"+sitePath+"include/ajax.php?id="+vd+"&action=videoscore",function (obj){
			var a=obj.responseText
			try{
				a.replace(/\[(\d+),(\d+),(.*),(\d+),(\d+)\]/i,function ($0,d,t,s,l,a){
					var x=parseInt(l),y=(Math.round(s / x * 10) / 10.0) || 0;
					document.getElementById('MARK_B1').value=x;
					document.getElementById('MARK_B2').value=y;
					document.getElementById('MARK_B3').value=s;
					document.getElementById('MARK_B4').value=a;
					if(s<=0){
						document.getElementById("filmStarScore").innerHTML = "0<i>.0</i>";
						document.getElementById("start").className = "starB s0";
					}else{
						var ky = y.toString();
						if(ky.indexOf(".")<0){
							ky = ky + ".0";
						}
						ky = ky.replace(".","<i>.");
						ky = ky + "</i>";
						document.getElementById("filmStarScore").innerHTML = ky;
						document.getElementById("start").className = "starB s" + parseInt(y, 10).toString();
						if(parseInt(y, 10)==0){ var ka = 0; }else{ var ka = parseInt(y, 10)-1; }
						document.getElementById("filmStarScoreTip").innerHTML = textStart[ka]+"("+x+"评)";
						if(document.getElementById("renums")){ document.getElementById("renums").innerHTML = x;	}
					}
				});
			}catch(ig){}
	});
}
function startm(v){
	var textStart = Array("很烂 浪费时间","很烂 浪费时间","平庸 不看也罢","平庸 不看也罢","平庸 不看也罢","一般 不妨一看","很好 公认佳作","很好 公认佳作","完美 不容错过","完美 不容错过");
  document.getElementById("filmStarScoreTip").innerHTML = textStart[v-1];
  document.getElementById("start").className = "starB s" + v.toString();
  document.getElementById("filmStarScore").innerHTML = v + "<i>.0</i>"

}
function OnStar(mid,v){
	var textStart = Array("很烂 浪费时间","很烂 浪费时间","平庸 不看也罢","平庸 不看也罢","平庸 不看也罢","一般 不妨一看","很好 公认佳作","很好 公认佳作","完美 不容错过","完美 不容错过");
	ajax.get("/"+sitePath+"include/ajax.php?id="+mid+"&action=score&score="+v,function (obj){
		var x=''+obj.responseText;
		if(x.indexOf("havescore")!=-1){
			alert('你已经评过分啦');
		}else if(x.indexOf("login")!=-1){
			alert('请登录后再评分');
			location.href="/"+sitePath+"login.php";
			}else{
			var x = parseFloat(document.getElementById("MARK_B1").value);
			var y = parseFloat(document.getElementById("MARK_B2").value);
			var z = parseFloat(document.getElementById("MARK_B3").value);
			var a = parseFloat(document.getElementById("MARK_B4").value);
			var kx = x + 1 + a;//人数
			var kx2 = x + 1
			var kz = z + v + (y * a);//总分
			var ky = (Math.round(kz / kx * 10) / 10) || 0;
			document.getElementById("MARK_B1").value = kx-a;
			document.getElementById("MARK_B2").value = ky;
			document.getElementById("MARK_B3").value = kz;
			var kky = ky.toString();
			if(kky.indexOf(".")<0){
				kky = kky + ".0";
			}
			kky = kky.replace(".","<i>.");
			kky = kky + "</i>";
			document.getElementById("filmStarScore").innerHTML = kky;
			document.getElementById("start").className = "starB s" + (parseInt(ky, 10)-1).toString();
			document.getElementById("filmStarScoreTip").innerHTML = "感谢您的参与！";
			alert("已有"+kx2+"人参与评分");
			//document.getElementById("filmStarScoreTip").innerHTML = textStart[ky]+"("+kx+"评)";
			if(document.getElementById("renums")){ document.getElementById("renums").innerHTML = kx;	}
			setTimeout(kaifach,10000);
		}
	});
}
function kaifach(){
	var textStart = Array("很烂 浪费时间","很烂 浪费时间","平庸 不看也罢","平庸 不看也罢","平庸 不看也罢","一般 不妨一看","很好 公认佳作","很好 公认佳作","完美 不容错过","完美 不容错过");
	var x = parseFloat(document.getElementById("MARK_B1").value);
	var y = parseFloat(document.getElementById("MARK_B2").value);
	var z = parseFloat(document.getElementById("MARK_B3").value);
	var a = parseFloat(document.getElementById("MARK_B4").value);
	var ky = y.toString();
	if(ky.indexOf(".")<0){
		ky = ky + ".0";
	}
	ky = ky.replace(".","<i>.");
	ky = ky + "</i>";
	document.getElementById("filmStarScore").innerHTML = ky;
	document.getElementById("start").className = "starB s" + parseInt(y, 10).toString();
	if(parseInt(y, 10)>0){
		document.getElementById("filmStarScoreTip").innerHTML = textStart[parseInt(y, 10)-1]+"("+x+"评)";
	}else{
		if(z>0){
			document.getElementById("filmStarScoreTip").innerHTML = textStart[0]+"("+x+"评)";
		}else{
			document.getElementById("filmStarScoreTip").innerHTML = "";
		}
	}


}

function addFavorite(sURL, sTitle){
	try{ window.external.addFavorite(sURL, sTitle);}
		catch (e){
			try{window.sidebar.addPanel(sTitle, sURL, "");}
			catch (e)
				{alert("加入收藏失败，请使用Ctrl+D进行添加");}
		}
}

function setHome(obj,vrl,url){
    try{obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
	this.style.behavior='url(#default#homepage)';this.setHomePage(url);}
        catch(e){
            if(window.netscape){
                try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");}  
                   catch (e){alert("此操作被浏览器拒绝！请手动设置");}
                   var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                   prefs.setCharPref('browser.startup.homepage',vrl);
             }
      }
}

function addFace(id) {
	document.getElementById('m_content').value += '[ps:' + id +']';
}

function openWin(url,w,h,left,top,resize){
	window.open(url,'New_Win','toolbars=0, scrollbars=0, location=0, statusbars=0,menubars=0, resizable='+(resize)+',width='+w+',height='+h+',left='+left+',top='+top);
}

function loadSlide(w,h){
	var type=1   //type=0不显示幻灯片右侧列表；type=1显示幻灯片右侧列表
	document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0" width="'+w+'" height="'+h+'"><param name="movie" value="/'+sitePath+'pic/slide/slide.swf" /><param name="quality" value="high"><param   name="wmode"   value="transparent"><param name="allowscriptaccess" value="always"><param name="allowfullscreen" value="true"><param name="flashvars" value="type='+type+'&domain=/'+sitePath+'pic/slide/"><embed src="/'+sitePath+'pic/slide/slide.swf" flashvars="type='+type+'&domain=/'+sitePath+'pic/slide/" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" allowfullscreen="true" width="'+w+'" height="'+h+'"></embed></object>');
}

function stringReplaceAll(str,findstr,replacestr){var raRegExp = new RegExp(findstr,"g");return str.replace(raRegExp,replacestr);}

function addRemoteFavor(){
	ajax.get(
		"/"+sitePath+"include/ajax.php?action=favorAjax&id="+play_vid+"&faction=add",
		function (obj){alert(obj.responseText)}
	);
}

var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1); 

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
    /* c1 */
    do {
        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c1 == -1);
    if(c1 == -1)
        break;

    /* c2 */
    do {
        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c2 == -1);
    if(c2 == -1)
        break;

    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

    /* c3 */
    do {
        c3 = str.charCodeAt(i++) & 0xff;
        if(c3 == 61)
        return out;
        c3 = base64DecodeChars[c3];
    } while(i < len && c3 == -1);
    if(c3 == -1)
        break;

    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

    /* c4 */
    do {
        c4 = str.charCodeAt(i++) & 0xff;
        if(c4 == 61)
        return out;
        c4 = base64DecodeChars[c4];
    } while(i < len && c4 == -1);
    if(c4 == -1)
        break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}