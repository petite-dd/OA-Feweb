window.onload = function  (argument) {

	var changeDate = '';
	var changeObj = new Object();

	loadingPage("disappear");

	var setTimeArr = new Array();

 
    // getOwnMonth();
    resizeDateBox();

    window.onresize = function(){
        resizeDateBox();
    }

    var signRecordState = new Object();

    $('.selectTimeBtn').on('click',function(){
        loadingPage("appear",'请稍等');
        searchMonth($('.innerSelectYear').val(),$('.innerSelectMonth').val());
    })
    $('.innerSelectYear,.innerSelectMonth').bind('change',function(){
        // console.log(1);
        $('.dateList').hide(300);
    })

    function searchMonth(year,month){
        var searchTime = year + '/' + month + '/' + '01';
        // console.log(searchTime);
        var time = new Date(searchTime);
        createDateContent(time);
        $.ajax({
        	type : 'POST',
        	url : initObj.getVacation ,
        	data : {
				"u_id": 1 ,
			    "token": "123123123" ,
			    "date": year + '-' + month
        	},
        	success : function(data){
        		console.log(data);

        		loadingPage("disappear");

        		if(data.code == 200){
        			for(var i = 0 ; i < data.contents.date.length ; i ++){
        				$('.innerDate').eq(data.contents.date[i] - 1).addClass('changeStateBorder');
        			}
        		}else{

        		}
        	}
        })
    }
    function createDateBox(num){  //----生成日历格子
        for(var i = 0 ; i < num ; i ++){
            $('.signInStatusContent').prepend('<div class="signInStatusContentBox"><div class="signInStatusContentBoxInner"><div class="signInStatusContentBoxState"></div></div></div>');
        }
        // resizeDateBox();
        $('.dateList').show(300,function(){
            resizeDateBox();
            getOwnMonth($('.innerSelectYear').val(),$('.innerSelectMonth').val());
        });
        // $('.dateList').css('display' , 'block');
    }
    function resizeDateBox(){  //-----重置日历格子的宽高及样式
        var boxWidth = $('.signInStatusContentBox').width();
        $('.signInStatusContentBox').height(boxWidth);
        $('.signInStatusBottomContentColor').css({'height' : $('.signInStatusContentBox').height() / 2 + 'px' , 'width' : $('.signInStatusContentBox').width() / 2 + 'px'});
        $('.signInStatusBottomTop').height(($('.signInStatusContentBox').height() * 1.5) + 'px');
        $('.signInStatusBottomContentType').css('line-height' , $('.signInStatusBottomContentColor').height() + 'px');
        $('.signInStatusContentBoxInner').css({'line-height' : $('.signInStatusContentBoxInner').height() + 'px'});
        $('.signInStatusContentBoxStateInner').css({'line-height' : $('.signInStatusContentBoxState').height() - 3 + 'px'});
    	
    	$('.setDayVocationWrap').height($('.setDayVocationWrap').width());
    }

    function createDateContent(date){  //-----生成日历格子内日期
        $('.signInStatusContent').html('<div class="clear"></div>');
        var firstDayThisMouth = date.getYear() + 1900 + '/' + (date.getMonth() + 1) + '/' + '1';  //-----获取本月的第一天
        var firstDayThisMouthTime = date.getTime(firstDayThisMouth);  //-----获取本月第一天的时间戳
        var firstDayDate = new Date(firstDayThisMouth);
        var firstDaygetDay = firstDayDate.getDay();  //-----获取本月第一天是星期几
        var thisMouthNewDay = new Date((date.getYear() + 1900) , (date.getMonth() + 1) , 0);
        var thisMouthDay = thisMouthNewDay.getDate();

        // console.log('本月第一天为 ' + firstDayThisMouth);
        // console.log('本月第一天的时间戳为 ' + firstDayThisMouthTime);
        // console.log('本月一号是星期 ' + firstDaygetDay);
        // console.log('本月共有 ' + thisMouthDay + ' 天');

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

    $('.setVocationBtn').on('click',function(){ //-----左侧保存按钮被点击
    	if(confirm('是否保存设置？')){
    		// console.log(changeObj);
    		loadingPage("appear","请稍等...");
    		var returnObj = {
				"u_id": 1 ,
			    "token": "123123123" ,
			    "contents": changeObj
    		}
    		console.log(returnObj);
    		$.ajax({
    			type : 'POST' ,
    			url : initObj.setDateToVacation , 
    			data : {
    				"u_id": 1 ,
				    "token": "123123123" ,
				    "contents": changeObj
    			},
    			success : function(data){
    				console.log(data);
    				loadingPage("disappear");
    				if(data.code == 200){
    					alert('设置成功');
    					$('.selectTimeBtn').click();
    				}
    				
    			}
    		})

    		changeObj = new Object();
    	}
    })

    $('.setDayContentBtn').on('click',function(){ //-----右侧保存按钮被点击
    	if(confirm('是否保存设置？')){
    		var setDayArr = [];
    		for(var i = 0 ; i < $('.changeDayState').length ; i ++){
    			if($('.changeDayState').eq(i).text() == 7){
    				setDayArr[i] = 0;
    			}else{
    				setDayArr[i] = $('.changeDayState').eq(i).text();
    			}
    		}
    		console.log(setDayArr);

    		$.ajax({
    			type : 'POST' ,
    			url : initObj.setVacation ,
    			data : {
    				"u_id": 1 ,
				    "token": "123123123" ,
				    "date": setDayArr
    			},
    			success : function(data){
    				console.log(data);
    				$('.selectTimeBtn').click();
    				if(data.code == 200){
    					// alert('设置成功');
    				}else{
    					alert(data.message);
    				}
    			}
    		})
    		setDayArr = [];
    	}
    })

    $('.innerSetDay').on('click',function(){

        if($(this).hasClass('changeDayState')){
        	$(this).removeClass('changeDayState');
        }else{
        	$(this).addClass('changeDayState');
        }
    })

    var allDateContent = {};
    var setYear = '';
    var setMonth = '';
    function getOwnMonth(year,month){
    	console.log(year + ',' + month);
    	setYear = year;
    	setMonth = month;
    }
    
    	
    // });
    // $('.innerDate').on('click',function(){
    $(document).delegate('.innerDate', 'click', function(event) {

        var str = $(this).text();

        var reg = /[0-9]+$/;

        // console.log(str.match(reg));
        var thisIndex = str.match(reg);

        if(thisIndex[0].length == 1){
        	thisIndex[0] = '0' + thisIndex[0];
        }

        $('.changeDateNum').html(thisIndex);


        changeDate = setYear + '-' + setMonth + '-' + thisIndex;
        setTimeArr[0] = setYear;
        setTimeArr[1] = setMonth;
        setTimeArr[2] = thisIndex;

        console.log(changeDate);

        if($(this).hasClass('changeStateBorder')){
        	$(this).removeClass('changeStateBorder');
        	changeObj[changeDate] = 'work';
        }else{
        	$(this).addClass('changeStateBorder');
        	changeObj[changeDate] = 'vacation';
        }

    })



    function loadingPage(operation,content){
        if(operation == 'appear'){
            if(content){
                $('.loadingMaskBot').html(content);
            }
            $('.loadingMask').css('display' , 'flex');
            $('.loadingMask').animate({'opacity' : 1}, 300);
        }else if(operation == 'disappear'){
            $('.loadingMask').animate({'opacity' : 0}, 300 , function(){
                $('.loadingMask').css('display' , 'none');
            });
        }
    }


}





