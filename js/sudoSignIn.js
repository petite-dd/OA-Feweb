window.onload = function  (argument) {

var num = 0;
var change = []; //最终结果
var changeBox = ["签到","迟到","半天假","全天假","签退"];
var json1 = 
[
    {
    "name":"序号",
    "sex":"姓名",
    "team":"性别",
    "deep":"职务",
    "dd":"身份"
    }
]
var json = 
[
    {
    	"name":"01",
    	"sex":"刘浏",
    	"team":"男",
    	"deep":"设计总监",
        "dd":"股东"
    },
    {
    	"name":"02",
        "sex":"12",
        "team":"13",
        "deep":"个人中心2",
        "dd":"dd"
    },
    {
        "name":"03",
        "sex":"13",
        "team":"14",
        "deep":"个人中心3",
        "dd":"dd"
    },
    {
        "name":"03",
        "sex":"13",
        "team":"14",
        "deep":"个人中心3",
        "dd":"dd"
    },
    {
        "name":"03",
        "sex":"13",
        "team":"14",
        "deep":"个人中心3",
        "dd":"dd"
    },
    {
        "name":"03",
        "sex":"13",
        "team":"14",
        "deep":"个人中心3",
        "dd":"dd"
    },
    {
        "name":"03",
        "sex":"13",
        "team":"14",
        "deep":"个人中心3",
        "dd":"dd"
    },
    {
        "name":"03",
        "sex":"13",
        "team":"14",
        "deep":"个人中心3",
        "dd":"dd"
    },
    {
        "name":"03",
        "sex":"13",
        "team":"14",
        "deep":"个人中心3",
        "dd":"dd"
    },
    {
        "name":"03",
        "sex":"13",
        "team":"14",
        "deep":"个人中心3",
        "dd":"dd"
    },
    {
        "name":"03",
        "sex":"13",
        "team":"14",
        "deep":"个人中心3",
        "dd":"dd"
    },
    {
        "name":"03",
        "sex":"13",
        "team":"14",
        "deep":"个人中心3",
        "dd":"dd"
    }
]
    var message_list_box = document.getElementById('message_list_box');
    var message_box = document.getElementsByClassName('message_box');
    var message_list = document.getElementsByClassName('message_list');
    var jsonNum = 0;
    var five = 5;
    for (var i = 0; i < json.length ; i++) {
        var create_messageList = document.createElement("div");
        create_messageList.setAttribute("class","message_list");
        message_list_box.appendChild(create_messageList);
        for (var line = 0; line < 5; line++) {
            var create_message_box = document.createElement("div");
            create_message_box.setAttribute("class","message_box");
            var testArr = ['name' , 'sex' , 'team' , 'deep' , 'dd']
            create_message_box.innerHTML = json[i][testArr[line]];
            message_list[i].appendChild(create_message_box);
        };
    };

    //给按钮增加状态
    changeButton = document.getElementsByClassName("changeButton");
    for (var i = 0; i < changeButton.length; i++) {
        changeButton[i].setAttribute("status","click")
        changeButton[i].onclick = function () {
            var self=this;
            clickButton(self);
        }
    };
    changeButton[4].setAttribute("status","unclick"); //初始化不可以点签退
    clickButton(changeButton[4]);
    function clickButton (self) {
        // console.log(self.getAttribute("status"));
        if (self.getAttribute("status") == "click") {
            self.setAttribute("status","down");
        } else if (self.getAttribute("status") == "down") {
            self.setAttribute("status","click");
        } else{};


        if (self == changeButton[0] && changeButton[0].getAttribute("status") == "down") {
            changeButton[4].setAttribute("status","click");
        };
        if (self == changeButton[0] && changeButton[2].getAttribute("status") == "click" && changeButton[0].getAttribute("status") == "click") {
            changeButton[4].setAttribute("status","unclick");
        };
        if (self == changeButton[2] && changeButton[0].getAttribute("status") == "click" && changeButton[2].getAttribute("status") == "down") {
            changeButton[4].setAttribute("status","click");
        };
        if (self == changeButton[2] && changeButton[0].getAttribute("status") == "click" && changeButton[2].getAttribute("status") == "click") {
            changeButton[4].setAttribute("status","unclick");
        };
        if (self == changeButton[1] && changeButton[1].getAttribute("status") == "down" && changeButton[0].getAttribute("status") == "click") {
            changeButton[0].click();
        };
        if (self == changeButton[0] && changeButton[0].getAttribute("status") == "click" && changeButton[1].getAttribute("status") == "down") {
            changeButton[1].click();
        };
        if (self == changeButton[4] && changeButton[4].getAttribute("status") == "down" && changeButton[2].getAttribute("status") == "down" ) {
            changeButton[0].setAttribute("status","unclick");
            changeButton[1].setAttribute("status","unclick");
        };//选了半天假和签退不可以选择签到
        if (self == changeButton[4] && changeButton[4].getAttribute("status") == "click" && changeButton[2].getAttribute("status") == "down" ) {
            changeButton[0].setAttribute("status","click");
            changeButton[1].setAttribute("status","click");
        };//选了半天假,取消选择签退，恢复签到可选
        if (self == changeButton[0] && changeButton[0].getAttribute("status") == "click" && changeButton[2].getAttribute("status") == "down" ) {
            changeButton[4].setAttribute("status","click");
        };//选了半天假,取消选择签到，恢复签退可选
        if (self == changeButton[2] && changeButton[2].getAttribute("status") == "click" && changeButton[0].getAttribute("status") == "down" ) {
            changeButton[4].setAttribute("status","click");
        };//选了签到,取消选择半天假，恢复签退可选
        if (self == changeButton[2] && changeButton[2].getAttribute("status") == "click" && changeButton[4].getAttribute("status") == "down" ) {
            changeButton[0].setAttribute("status","click");
            changeButton[1].setAttribute("status","click");
        };//选了签退,取消选择半天假，恢复签到可选
        if (self == changeButton[2] && changeButton[2].getAttribute("status") == "down" && changeButton[0].getAttribute("status") == "down" ) {
            changeButton[4].setAttribute("status","unclick");
        };//选了签到,选了半天假，恢复签退可选
        if (self == changeButton[0] && changeButton[0].getAttribute("status") == "down" && changeButton[2].getAttribute("status") == "down" ) {
            changeButton[4].setAttribute("status","unclick");
        };//选了半天假和签到不可以选择签退
        if (self == changeButton[3] && changeButton[3].getAttribute("status") == "down") {
            changeButton[0].setAttribute("status","unclick");
            changeButton[1].setAttribute("status","unclick");
            changeButton[2].setAttribute("status","unclick");
            changeButton[4].setAttribute("status","unclick");
        };
        if (self == changeButton[3] && changeButton[3].getAttribute("status") == "click") {
            changeButton[0].setAttribute("status","click");
            changeButton[1].setAttribute("status","click");
            changeButton[2].setAttribute("status","click");
            changeButton[4].setAttribute("status","unclick");
        };
        // if ((self == changeButton[0] && changeButton[0].getAttribute("status") == "down") && (self == changeButton[1] && changeButton[1].getAttribute("status") == "down") || (self == changeButton[2] && changeButton[2].getAttribute("status") == "down") ) {
        //     changeButton[3].setAttribute("status","unclick");
        // };
        // if ((self == changeButton[0] && changeButton[0].getAttribute("status") == "click") && (self == changeButton[4] && changeButton[4].getAttribute("status") == "down") || (self == changeButton[2] && changeButton[2].getAttribute("status") == "down") ) {
        //     changeButton[2].setAttribute("status","click");
        // };
        if (changeButton[0].getAttribute("status") == "click" && changeButton[1].getAttribute("status") == "click" && changeButton[2].getAttribute("status") == "click") {
            changeButton[3].setAttribute("status","click");
        };
        if (changeButton[0].getAttribute("status") == "down" && changeButton[4].getAttribute("status") == "down") {
            changeButton[2].setAttribute("status","unclick");
        };
        // if (self == changeButton[2] && changeButton[2].getAttribute("status") == "down") {
        //     changeButton[3].setAttribute("status","unclick");
        // };
        if (changeButton[4].getAttribute("status") == "down" && changeButton[0].getAttribute("status") == "click") {
            changeButton[4].setAttribute("status","unclick"); 
        };
        if (changeButton[4].getAttribute("status") == "click" && changeButton[0].getAttribute("status") == "down" && changeButton[2].getAttribute("status") == "unclick") {
            changeButton[2].setAttribute("status","click"); 
        };
        if (changeButton[0].getAttribute("status") == "click" && changeButton[4].getAttribute("status") == "unclick" && changeButton[2].getAttribute("status") == "unclick") {
            changeButton[2].setAttribute("status","click"); 
            // alert("ok");
        };




        for (var i = 0; i < changeButton.length; i++) {
            if (changeButton[i].getAttribute("status") == "click") {
                changeButton[i].style.backgroundColor = "rgba(135,206,235,0.13)";
                changeButton[i].style.border = "1px solid lightgrey";
                changeButton[i].style.color = "black";
            } else if (changeButton[i].getAttribute("status") == "down"){
                changeButton[i].style.backgroundColor = "rgba(135,206,235,0.7)";
                changeButton[i].style.border = "2px solid grey";
                changeButton[i].style.color = "black";
            } else{
                changeButton[i].style.backgroundColor = "lightgrey";
                changeButton[i].style.border = "1px solid lightgrey";
                changeButton[i].style.color = "grey";
            };
            if (changeButton[i].getAttribute("status") == "down") {
                change[num] = changeBox[i]; 
                num++;             
            };
        };
        console.log(change);
        // console.log(changeBox);
        change = [];
        num = 0;
    };
}





