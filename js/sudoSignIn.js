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



    
    // getOwnMonth();
    resizeDateBox();

    window.onresize = function(){
        resizeDateBox();
    }

    var signRecordState = new Object();

    $('.message_list').on('click', function(event) { //-----左侧人员列表点击事件
        event.preventDefault();
        $('.message_list').removeClass('selectPeople');
        $(this).addClass('selectPeople');

        console.log($(this).index());
        $('.selectTimeBtn').show(300);
    });

    $('.selectTimeBtn').on('click',function(){

        searchMonth($('.innerSelectYear').val(),$('.innerSelectMonth').val());
    })
    $('.innerSelectYear,.innerSelectMonth').bind('change',function(){
        console.log(1);
        $('.dateList').hide(300);
        $('#changeButtonBox').hide(300);
    })

    function searchMonth(year,month){
        var searchTime = year + '/' + month + '/' + '01';
        console.log(searchTime);
        var time = new Date(searchTime);
        createDateContent(time);
    }
    function createDateBox(num){  //----生成日历格子
        for(var i = 0 ; i < num ; i ++){
            $('.signInStatusContent').prepend('<div class="signInStatusContentBox"><div class="signInStatusContentBoxInner"><div class="signInStatusContentBoxState"></div></div></div>');
        }
        $('.dateList').show(300,function(){
            resizeDateBox();
            getOwnMonth($('.innerSelectYear').val(),$('.innerSelectMonth').val());
        });
        // $('.dateList').css('display' , 'block');
        // resizeDateBox();
    }
    function resizeDateBox(){  //-----重置日历格子的宽高及样式
        var boxWidth = $('.signInStatusContentBox').width();
        $('.signInStatusContentBox').height(boxWidth);
        $('.signInStatusBottomContentColor').css({'height' : $('.signInStatusContentBox').height() / 2 + 'px' , 'width' : $('.signInStatusContentBox').width() / 2 + 'px'});
        $('.signInStatusBottomTop').height(($('.signInStatusContentBox').height() * 1.5) + 'px');
        $('.signInStatusBottomContentType').css('line-height' , $('.signInStatusBottomContentColor').height() + 'px');
        $('.signInStatusContentBoxInner').css({'line-height' : $('.signInStatusContentBoxInner').height() + 'px'});
        $('.signInStatusContentBoxStateInner').css({'line-height' : $('.signInStatusContentBoxState').height() - 3 + 'px'});
    }

    function createDateContent(date){  //-----生成日历格子内日期
        $('.signInStatusContent').html('<div class="clear"></div>');
        var firstDayThisMouth = date.getYear() + 1900 + '/' + (date.getMonth() + 1) + '/' + '1';  //-----获取本月的第一天
        var firstDayThisMouthTime = date.getTime(firstDayThisMouth);  //-----获取本月第一天的时间戳
        var firstDayDate = new Date(firstDayThisMouth);
        var firstDaygetDay = firstDayDate.getDay();  //-----获取本月第一天是星期几
        var thisMouthNewDay = new Date((date.getYear() + 1900) , (date.getMonth() + 1) , 0);
        var thisMouthDay = thisMouthNewDay.getDate();

        console.log('本月第一天为 ' + firstDayThisMouth);
        console.log('本月第一天的时间戳为 ' + firstDayThisMouthTime);
        console.log('本月一号是星期 ' + firstDaygetDay);
        console.log('本月共有 ' + thisMouthDay + ' 天');

        if((firstDaygetDay + thisMouthDay) > 35){
            createDateBox(42);
        }else{
            createDateBox(35);
        }
        for (var i = 0 ; i < thisMouthDay ; i ++){
            $('.signInStatusContentBoxInner').eq(firstDaygetDay + i).append(i + 1);
            $('.signInStatusContentBoxInner').eq(firstDaygetDay + i).css('border-color' , 'rgb(200,200,200)');
            $('.signInStatusContentBoxInner').eq(firstDaygetDay + i).addClass('innerDate');
        }

        // resizeDateBox();
    }
    function getOwnMonth(year,month){
        $.ajax({
            type: 'POST',
            url: initObj.getMonth , 
            // url: "http://192.168.1.135:8080/home/sign" , 
            data: {
                u_id : 1,
                token : '123123123' ,
                toUser : 1 ,
                // month: year + '-' + month
                month:"2016-10"
            } ,
            success: function(data){
                console.log(data);

                if(data.code == 200){
                    if(data.contents.operable.length == 0){  //------获取按钮点击状态
                        $('.signInBtn').attr('disabled','disabled').css('opacity','0.5');
                    }else if(data.contents.operable.length > 0){
                        if(data.contents.operable[0] == 'signIn'){
                            $('.signBtnOff').attr('disabled','disabled').css('opacity','0.5');
                            $('.signBtnIn').css({'opacity':'1' , 'cursor' : 'pointer'});
                        }else if(data.contents.operable[0] == 'signOff'){
                            $('.signBtnIn').attr('disabled','disabled').css('opacity','0.5');
                            $('.signBtnOff').css({'opacity':'1' , 'cursor' : 'pointer'});
                        }
                    }

                    // loadingPage('disappear');  //-----隐藏加载框

                    for(var i = 0 ; i < data.contents.signRecord.length ; i ++){
                        if(data.contents.signRecord[i].state == null){
                            // $('.innerDate').eq(i).css({'background-color' : 'rgb(123,14,35)'});
                            // $('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerEmpty">旷</div>');
                            // $('.signInStatusContentBoxStateInner').css({'line-height' : $('.signInStatusContentBoxState').height() - 3 + 'px'});
                        }else{
                            signRecordState = new Object();
                            for(var n = 0 ; n < data.contents.signRecord[i].state.length ; n ++){
                                signRecordState[data.contents.signRecord[i].state[n]] = 1;
                            }
                            // console.log(signRecordState);
                            if(signRecordState.absenteeism){
                                $('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerEmpty">旷</div>');
                                $('.signInStatusContentBoxStateInner').css({'line-height' : $('.signInStatusContentBoxState').height() - 3 + 'px'});
                            }
                            if(signRecordState.leaveFull){          //-----全天假
                                $('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerVocation">全</div>');
                            }
                            if(signRecordState.sign){   //-----签到
                                $('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerNormal">到</div>');
                            }
                            if(signRecordState.signOut){ //-----签退
                                $('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerNormal">退</div>');
                            }
                            if(signRecordState.late){   //-----迟到
                                $('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerEmpty">迟</div>');
                            }
                            if(signRecordState.leaveHalf){  //-----半天假
                                $('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerVocation">半</div>');
                            }
                            if(signRecordState.notSignOut){  //-----未签退
                                $('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerEmpty">退</div>');
                            }
                        }
                    }
                    $('.signBtnIn').bind('click',function(){
                        // console.log(1);
                        loadingPage('appear','操作执行中');
                        signInObj(initObj.sign);
                    })
                    $('.signBtnOff').bind('click',function(){
                        // console.log(0);
                        loadingPage('appear','操作执行中');
                        signInObj(initObj.signOut);
                    })
                    $('.innerDate').bind('click',function(){

                        var str = $(this).text();

                        var reg = /[0-9]+$/;

                        console.log(str.match(reg));

                        $('.changeDateNum').html(str.match(reg));

                        $('.innerDate').removeClass('changeDateActive');
                        $(this).addClass('changeDateActive');

                        $('#changeButtonBox').show(300);

                        console.log(signRecordState);
                    })
                }
            }
        });
    }
}





