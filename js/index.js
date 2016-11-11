// 获取侧边栏数据

var json = 
[
    {
    	"father_id":"0",
    	"child_id":"1",
    	"sid":"1",
    	"name":"个人中心",
    	"url":""
    },
    {
    	"father_id":"0",
    	"child_id":"2",
    	"sid":"2",
    	"name":"签到系统",
    	"url":"www.baidu.com"
    },
    {
    	"father_id":"0",
    	"child_id":"3",
    	"sid":"3",
    	"name":"信息中心",
    	"url":"www.baidu.com"
    },
    {
    	"father_id":"1",
    	"sid":"4",
    	"name":"个人信息",
    	"url":"person.html"
    },
    {
    	"father_id":"1",
    	"sid":"5",
    	"name":"工资清单",
    	"url":"iframe_2.html"
    },
    {
    	"father_id":"1",
    	"sid":"6",
    	"name":"请假申请",
    	"url":"iframe_3.html"
    },
    {
    	"father_id":"1",
    	"sid":"7",
    	"name":"奖惩纪录",
    	"url":"iframe_4.html"
    },
    {
    	"father_id":"1",
    	"sid":"8",
    	"name":"项目纪录",
    	"url":"iframe_5.html"
    },
    {
    	"father_id":"2",
    	"sid":"9",
    	"name":"签到系统",
    	"url":"signIn.html"
    },
    {
    	"father_id":"2",
    	"sid":"10",
    	"name":"今日签到",
    	"url":"iframe_7.html"
    },
    {
    	"father_id":"3",
    	"sid":"11",
    	"name":"人员通讯",
    	"url":"www.baidu.com"
    },
    {
    	"father_id":"3",
    	"sid":"12",
    	"name":"公司通知",
    	"url":"www.baidu.com"
    },
    {
    	"father_id":"3",
    	"sid":"13",
    	"name":"公司工具",
    	"url":"www.baidu.com"
    },
    {
    	"father_id":"3",
    	"sid":"14",
    	"name":"企业邮箱",
    	"url":"http://mail.hichina.com/"
    },
    {
    	"father_id":"3",
    	"sid":"15",
    	"name":"企业文化",
    	"url":"www.baidu.com"
    },
    {
    	"father_id":"3",
    	"sid":"16",
    	"name":"组织架构",
    	"url":"www.baidu.com"
    }
]
var family = document.getElementsByClassName("family");
var child = document.getElementsByClassName("child");
var sanjiao = document.getElementsByClassName("sanjiao");
var iframe = document.getElementsByClassName('iframe');
var num_1 = 0;
var num_2 = 0;
var iframe_num = 0;
for (var i = 0; i < json.length; i++) {
	// json[i]
	if (json[i].father_id == 0) {

		//创建family
		var create_family = document.createElement("div");
		create_family.setAttribute("class","family");
		create_family.setAttribute("id","family" + json[i].child_id);
		nav.appendChild(create_family);
	
		//创建father
		var create_father= document.createElement("div");
		create_father.setAttribute("class","father");
		create_father.setAttribute("id","father_" + json[i].child_id);
		family[num_1].appendChild(create_father);
		create_father.appendChild(document.createTextNode(json[i].name));
		num_1++;
		
	} else{
		//创建child
		var create_child = document.createElement("div");
		create_child.setAttribute("class","child");
		create_child.setAttribute("id","child_" + json[i].sid);
		family[json[i].father_id - 1].appendChild(create_child);;
		create_child.appendChild(document.createTextNode(json[i].name));

	
		//创建sanjiao
		var create_sanjiao= document.createElement("div");
		create_sanjiao.setAttribute("class","sanjiao");
		child[num_2].appendChild(create_sanjiao);
		num_2++;
	};
};

console.log(json);


// 初始化长宽
if (1227 > document.body.clientWidth) {
	nav.style.display = "none";
	nav_none.style.display = "none";
} else{};
iframe_body.style.width = document.body.clientWidth - 215 + "px";
iframe_box.style.height = document.body.clientHeight - 82 + "px";
if (nav.style.width != "0px") {
	iframe_body.style.width = document.body.clientWidth - 210 + "px";
	notify.style.width = document.body.clientWidth - 215 + "px";
} else{
	iframe_body.style.width = "100%";
	notify.style.width = "100%";
};
window.onresize = function () {
	iframe_box.style.height = document.body.clientHeight - 82 + "px";
	if (nav.style.width != "0px") {
		iframe_body.style.width = document.body.clientWidth - 215 + "px";
		notify.style.width = document.body.clientWidth - 215 + "px";
	} else{
		iframe_body.style.width = "100%";
		notify.style.width = "100%";
	};
	// iframe_box.style.height = document.body.clientHeight - 60 + "px";
}


//侧边栏的缩放效果
var child = document.getElementsByClassName('child');
var family = document.getElementsByClassName('family');
var father = document.getElementsByClassName('father');
var num = 0;

for (var i = 0; i < family.length; i++) {
	father[i].onclick = function () {
		for (var a = 0; a < father.length; a++) {
			father[a].style.backgroundColor = "#5c5b59";
			father[a].style.color = "white"; 
		};
		this.style.backgroundColor = "#f8f8f8";
		this.style.color = "black"; 
		for (var i = 0; i < family.length; i++) {
			family[i].style.height = "7.2vh";
		};
		this.parentNode.style.height = ((this.parentNode.getElementsByTagName('div').length - 1)/2)*4.5 + 5.5 + "vh";
		// console.log((this.parentNode.getElementsByTagName('div').length - 1)/2);
	}
};


//子菜单点击事件
for (var i = 0; i < child.length; i++) {
	child[i].onclick = function () {
		if (1227 > document.body.clientWidth) {
			setTimeout(function () {
				fang.click();
			},500);
		};
		for (var a = 0; a < child.length; a++) {
			child[a].getElementsByTagName('div')[0].style.left = "33px";
		};
		this.getElementsByTagName('div')[0].style.left = "20px";
		for (var i = 0; i < json.length; i++) {
			if ("child_" + json[i].sid == this.id) { //获得json中的url
				// alert(json[i].url);

				if (document.getElementById("iframe_" + json[i].sid)) {  //如果是已经打开过的iframe
					for (var c = 0; c < iframe.length; c++) {
						iframe[c].style.width = "0%";
					};
					document.getElementById("iframe_" + json[i].sid).style.width = "100%";
				} else{  //创建iframe
					var create_iframe = document.createElement("iframe");
					create_iframe.setAttribute("class","iframe");
					create_iframe.setAttribute("id","iframe_" + json[i].sid);
					iframe_box.appendChild(create_iframe);
					iframe[iframe_num].src = json[i].url;
					for (var b = 0; b < iframe.length; b++) {
						iframe[b].style.width = "0%";
					};
					iframe[iframe_num].style.width = "100%";
					iframe_num++;				
				};
			};
		};
	}
};
//小格子震动
var num = 0;
var t_box;
var important = document.getElementsByClassName('important');
function shake_box () {  //loginbox震动
	num ++;
	if (num == 1) {
		for (var i = 0; i < important.length; i++) {	
			important[i].style.transform = "rotate(10deg)"
		};
			t_box = setTimeout("shake_box()",100);
	} else if (num == 2) {
		for (var i = 0; i < important.length; i++) {
			important[i].style.transform = "rotate(-10deg)"
		};
			t_box = setTimeout("shake_box()",100);
	} else if (num == 3) {
		for (var i = 0; i < important.length; i++) {
			important[i].style.transform = "rotate(6deg)"
		};
			t_box = setTimeout("shake_box()",100);
	} else if (num == 4) {
		for (var i = 0; i < important.length; i++) {
			important[i].style.transform = "rotate(-6deg)"
		};
			t_box = setTimeout("shake_box()",100);
	} else if (num == 5) {
		for (var i = 0; i < important.length; i++) {
			important[i].style.transform = "rotate(3deg)"
		};
			t_box = setTimeout("shake_box()",100);
	} else{
		for (var i = 0; i < important.length; i++) {
			clearTimeout(t_box);
			important[i].style.transform = "rotate(0deg)"
			num = 0;
		};
	};
}
function shake () {
	setTimeout(function () {
		// num = 1;
		shake();
		shake_box();
	},2000);
}

shake();

//
for (var i = 0; i < important.length; i++) {
	important[i].onclick = function () {
		this.style.display = "none";
		empty.style.width = "100vw";
	}
};
x.onclick = function () {
	empty.style.width = "0";
}

//侧边栏展开事件
fang.onclick = function () {
	if (nav.style.width == "0px") {
		nav.style.width = "210px";
		nav_none.style.width = "210px";
		iframe_body.style.width = document.body.clientWidth - 210 + "px";
		notify.style.width = document.body.clientWidth - 210 + "px";
	} else{
		nav.style.width = "0px";
		nav_none.style.width = "0px";
		iframe_body.style.width = "100%";
		notify.style.width = "100%";
	};
}

if (1227 > document.body.clientWidth) {
	// fang.click();
	nav.style.display = "block";
	nav_none.style.display = "block";
} else{};

father_1.click();
child_4.click();


//time
var hour;
function showLocale(objD)
{
	var str,colorhead,colorfoot;
	var yy = objD.getYear();
	if(yy<1900) yy = yy+1900;
	var MM = objD.getMonth()+1;
	if(MM<10) MM = '0' + MM;
	var dd = objD.getDate();
	if(dd<10) dd = '0' + dd;
	var hh = objD.getHours();
	if(hh<10) hh = '0' + hh;
	var mm = objD.getMinutes();
	if(mm<10) mm = '0' + mm;
	var ss = objD.getSeconds();
	if(ss<10) ss = '0' + ss;
	var ww = objD.getDay();
	if  ( ww==0 )  colorhead="<font color=\"#FF0000\">";
	if  ( ww > 0 && ww < 6 )  colorhead="<font color=\"#373737\">";
	if  ( ww==6 )  colorhead="<font color=\"#008000\">";
	if  (ww==0)  ww="星期日";
	if  (ww==1)  ww="星期一";
	if  (ww==2)  ww="星期二";
	if  (ww==3)  ww="星期三";
	if  (ww==4)  ww="星期四";
	if  (ww==5)  ww="星期五";
	if  (ww==6)  ww="星期六";
	colorfoot="</font>"
	str = colorhead + yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss + "  " + ww + colorfoot;
	hour = hh;
	return(str);
}
function tick()
{
	var today;
	today = new Date();
	document.getElementById("time").innerHTML = showLocale(today);
	if (hour < 12) {
		morning.innerHTML = "早上好";
	} if (hour < 18 && hour >= 12) {
		morning.innerHTML = "下午好";
	} else{
		morning.innerHTML = "晚上好";
	};
	window.setTimeout("tick()", 1000);
}
tick();


